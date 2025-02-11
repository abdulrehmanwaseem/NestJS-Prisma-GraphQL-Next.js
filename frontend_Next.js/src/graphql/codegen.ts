import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/generatedTypes.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "src/redux/apis/generatedApi.ts": {
      plugins: ["typescript-rtk-query"],
      config: {
        fetcher: "graphql-request",
        importBaseApiFrom: "./index",
        baseApiImport: "api",
        exportHooks: true,
      },
    },
  },
};

export default config;
