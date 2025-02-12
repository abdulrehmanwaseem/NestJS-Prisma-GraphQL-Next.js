import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
    customErrors: (error) => {
      return error.response.errors;
    },
  }),

  tagTypes: ["Users"],
  endpoints: () => ({}),
});
