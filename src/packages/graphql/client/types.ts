import type { Plugin } from "@packages/graphql/plugins";

export type ErrorHandling = "all" | "first";

export interface GQLRequest<V extends Record<string, any>> {
  query: string;
  variables: V;
  plugins?: (typeof Plugin)[];
  errorHandling?: ErrorHandling;
}

export interface ErrorLocation {
  message: string;
  location: { column: number; line: number }[];
}
