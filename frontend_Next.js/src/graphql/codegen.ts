import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/redux/apis/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-rtk-query"],
      config: {
        fetcher: "graphql-request",
        importBaseApiFrom: "../redux/api",
        baseApiImport: "api",
        exportHooks: true,
      },
    },
  },
};

export default config;
