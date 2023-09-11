import type { GraphQLClientResponse } from "graphql-request/build/esm/types";
import type { EventEmitter } from "@figliolia/event-emitter";
import type { GraphQLClient } from "../Client";
import { GQLClientEvents } from "./types";
import type { GQLClientPluginEvents } from "./types";

export class Plugin {
  constructor(emitter: EventEmitter<GQLClientPluginEvents>) {
    const prototype = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(prototype).forEach(property => {
      if (property in GQLClientEvents) {
        const method = property as GQLClientEvents;
        // @ts-ignore
        emitter.on(method, this[method].bind(this));
      }
    });
  }
  // eslint-disable-next-line
  public onInitialized(client: GraphQLClient<any, any>) {}

  // eslint-disable-next-line
  public onResponse<T>(response: GraphQLClientResponse<T>) {}

  // eslint-disable-next-line
  public onAbort(client: GraphQLClient<any, any>) {}
}
