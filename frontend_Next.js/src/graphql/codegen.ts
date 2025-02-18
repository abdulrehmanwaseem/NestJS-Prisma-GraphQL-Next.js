import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/graphql/types.generated.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "src/graphql": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "./types.generated.ts",
      },
      plugins: ["typescript-operations", "typescript-rtk-query"],
      config: {
        overrideExisting: true,
        fetcher: "graphql-request",
        importBaseApiFrom: "@/redux/api",
        baseApiImport: "api",
        exportHooks: true,
        namingConvention: {
          enumValues: "keep",
        },
      },
    },
  },
};

export default config;
