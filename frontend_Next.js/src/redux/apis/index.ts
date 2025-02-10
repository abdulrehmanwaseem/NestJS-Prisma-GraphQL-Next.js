import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: graphqlRequestBaseQuery({
    url: "http://localhost:4000/graphql",
  }),
  tagTypes: [],
  keepUnusedDataFor: 0.01,
  endpoints: () => ({}),
});
