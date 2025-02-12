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
      // If no error information is available, then returning a generic error.
      if (
        !response ||
        !Array.isArray(response.errors) ||
        response.errors.length === 0
      ) {
        return {
          name,
          message: "Unknown error",
          statusCode: 500,
          error: "Unknown",
          stack: stack || "",
        };
      }

      const firstError = response.errors[0];
      const firstPath = firstError?.path?.[0] ?? "";

      const ext = (firstError?.extensions?.originalError ?? {}) as {
        message?: string;
        statusCode?: number;
        error?: string;
      };
      const { message = "", statusCode = 500, error = "" } = ext;
      return {
        name,
        path: firstPath,
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
