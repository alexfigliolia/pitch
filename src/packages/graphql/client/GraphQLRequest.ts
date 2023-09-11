import { GraphQLClient } from "./Client";
import type { GQLRequest } from "./types";

export const graphQLRequest = <
  D,
  V extends Record<string, any> = Record<string, any>,
>(
  params: GQLRequest<V>,
) => {
  const client = new GraphQLClient<D, V>(params);
  return client.request();
};
