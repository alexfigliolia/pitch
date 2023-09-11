import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/packages/graphql/types/graphql-schema.graphql",
  documents: ["src/**/*.gql.ts"],
  generates: {
    "./src/packages/graphql/types/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
