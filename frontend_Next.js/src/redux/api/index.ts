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
    // customErrors: (error) => {
    //   return error?.response?.errors[0];
    // },
  }),
  refetchOnMountOrArgChange: true,

  tagTypes: ["Users"],
  endpoints: () => ({}),
});
