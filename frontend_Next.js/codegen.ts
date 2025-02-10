import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  enerates: {
    "src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-rtk-query"],
      config: {
        fetcher: "graphql-request",
      },
    },
  },
};

export default config;
