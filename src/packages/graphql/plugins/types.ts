import type { GraphQLClient } from "@packages/graphql/client";
import type { GraphQLClientResponse } from "graphql-request/build/esm/types";

export enum GQLClientEvents {
  onAbort = "onAbort",
  onResponse = "onResponse",
  onInitialized = "onInitialized",
}

export interface GQLClientPluginEvents {
  onAbort: GraphQLClient<any, any>;
  onInitialized: GraphQLClient<any, any>;
  onResponse: GraphQLClientResponse<any>;
}
