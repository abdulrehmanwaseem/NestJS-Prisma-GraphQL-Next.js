import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { GraphQLClient } from "graphql-request";

// Partial<ClientError & { errorCode: number }
const client = new GraphQLClient("http://localhost:4000/graphql", {
  credentials: "include",
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    client,
    customErrors: ({ name, stack, response }) => {
      console.log("LOG FROM REDUX API: ", response);
      const firstPath = response?.errors?.[0]?.path?.[0] ?? "";
      const path = { path: firstPath };

      const ext = (response?.errors?.[0]?.extensions.originalError ?? {}) as {
        message?: string;
        statusCode?: number;
        error?: string;
      };
      const { message = "", statusCode = 500, error = "" } = ext;
      return {
        name,
        path,
        message,
        statusCode,
        error,
        stack,
      };
    },
  }),
  refetchOnMountOrArgChange: true,

  tagTypes: ["Users"],
  endpoints: () => ({}),
});
