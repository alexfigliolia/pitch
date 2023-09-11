import { GraphQLClient as Client } from "graphql-request";
import { Environment } from "@packages/environment";
import { EventEmitter } from "@figliolia/event-emitter";
import type { Plugin, GQLClientPluginEvents } from "@packages/graphql/plugins";
import type { ErrorHandling, GQLRequest } from "./types";

export class GraphQLClient<
  D,
  V extends Record<string, any> = Record<string, any>,
> {
  query: string;
  variables: V;
  plugins: Plugin[];
  errorHandling: ErrorHandling;
  signal = new AbortController();
  emitter = new EventEmitter<GQLClientPluginEvents>();
  constructor({
    query,
    variables,
    plugins = [],
    errorHandling = "first",
  }: GQLRequest<V>) {
    this.query = query;
    this.variables = variables;
    this.errorHandling = errorHandling;
    this.plugins = plugins.map(Plugin => new Plugin(this.emitter));
    this.emitter.emit("onInitialized", this);
  }

  public async request() {
    const client = new Client(Environment.GQL_URL, {
      mode: "cors",
      method: "POST",
      errorPolicy: "all",
      credentials: "include",
      signal: this.signal.signal,
    });
    try {
      const response = await client.rawRequest<D>(this.query, this.variables);
      this.emitter.emit("onResponse", response);
      return response;
    } catch (error: any) {
      if (this.errorHandling === "first" && error?.response?.errors?.length) {
        throw new Error(error.response.errors[0].message);
      }
      throw error;
    }
  }

  public abort() {
    this.signal.abort();
    this.emitter.emit("onAbort", this);
  }
}
