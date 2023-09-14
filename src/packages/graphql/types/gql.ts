/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  \n  query Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...UserFragment\n    }\n  }\n": types.LoginDocument,
    "\n  \n  query Verify($token: String!) {\n    verifyTokenMobile(token: $token) {\n      ...UserFragment\n    }\n  }\n": types.VerifyDocument,
    "\n  \n  mutation onBoard($name: String!, $email: String!, $password: String!) {\n    onboard(name: $name, email: $email, password: $password) {\n      ...UserFragment\n    }\n  }\n": types.OnBoardDocument,
    "\n  query FeedQuery($id: Int!, $startIndex: Int!) {\n    feed(id: $id, startIndex: $startIndex) {\n      id\n      created_by {\n        id\n        name\n      }\n      title\n      text\n      tags\n      visibility\n      _count {\n        likes\n        comments\n      }\n    }\n  }\n": types.FeedQueryDocument,
    "\n  mutation CreatePost(\n    $user_id: Int!\n    $title: String!\n    $text: String!\n    $tags: [String!]!\n    $visibility: Visibility!\n  ) {\n    createPost(\n      user_id: $user_id\n      title: $title\n      text: $text\n      tags: $tags\n      visibility: $visibility\n    ) {\n      id\n      created_by {\n        id\n        name\n      }\n      title\n      text\n      tags\n      visibility\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation AddPostLike($user_id: Int!, $post_id: Int!) {\n    addPostLike(user_id: $user_id, post_id: $post_id) {\n      id\n    }\n  }\n": types.AddPostLikeDocument,
    "\n  mutation RemovePostLike($user_id: Int!, $post_id: Int!) {\n    removePostLike(user_id: $user_id, post_id: $post_id) {\n      id\n    }\n  }\n": types.RemovePostLikeDocument,
    "\n  fragment UserFragment on user {\n    id\n    name\n    email\n    verified\n  }\n": types.UserFragmentFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Logout {\n    logout\n  }\n"): (typeof documents)["\n  query Logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  query Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query Verify($token: String!) {\n    verifyTokenMobile(token: $token) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  query Verify($token: String!) {\n    verifyTokenMobile(token: $token) {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation onBoard($name: String!, $email: String!, $password: String!) {\n    onboard(name: $name, email: $email, password: $password) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation onBoard($name: String!, $email: String!, $password: String!) {\n    onboard(name: $name, email: $email, password: $password) {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FeedQuery($id: Int!, $startIndex: Int!) {\n    feed(id: $id, startIndex: $startIndex) {\n      id\n      created_by {\n        id\n        name\n      }\n      title\n      text\n      tags\n      visibility\n      _count {\n        likes\n        comments\n      }\n    }\n  }\n"): (typeof documents)["\n  query FeedQuery($id: Int!, $startIndex: Int!) {\n    feed(id: $id, startIndex: $startIndex) {\n      id\n      created_by {\n        id\n        name\n      }\n      title\n      text\n      tags\n      visibility\n      _count {\n        likes\n        comments\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePost(\n    $user_id: Int!\n    $title: String!\n    $text: String!\n    $tags: [String!]!\n    $visibility: Visibility!\n  ) {\n    createPost(\n      user_id: $user_id\n      title: $title\n      text: $text\n      tags: $tags\n      visibility: $visibility\n    ) {\n      id\n      created_by {\n        id\n        name\n      }\n      title\n      text\n      tags\n      visibility\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost(\n    $user_id: Int!\n    $title: String!\n    $text: String!\n    $tags: [String!]!\n    $visibility: Visibility!\n  ) {\n    createPost(\n      user_id: $user_id\n      title: $title\n      text: $text\n      tags: $tags\n      visibility: $visibility\n    ) {\n      id\n      created_by {\n        id\n        name\n      }\n      title\n      text\n      tags\n      visibility\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddPostLike($user_id: Int!, $post_id: Int!) {\n    addPostLike(user_id: $user_id, post_id: $post_id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddPostLike($user_id: Int!, $post_id: Int!) {\n    addPostLike(user_id: $user_id, post_id: $post_id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemovePostLike($user_id: Int!, $post_id: Int!) {\n    removePostLike(user_id: $user_id, post_id: $post_id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemovePostLike($user_id: Int!, $post_id: Int!) {\n    removePostLike(user_id: $user_id, post_id: $post_id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UserFragment on user {\n    id\n    name\n    email\n    verified\n  }\n"): (typeof documents)["\n  fragment UserFragment on user {\n    id\n    name\n    email\n    verified\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;