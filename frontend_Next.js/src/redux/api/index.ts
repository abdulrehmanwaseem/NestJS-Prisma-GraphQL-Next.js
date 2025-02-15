import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { GraphQLClient } from "graphql-request";
import { parseGraphQLError } from "@/lib/utils";

const client = new GraphQLClient("http://localhost:4000/graphql", {
  credentials: "include",
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({
    client,
    customErrors: ({ name, stack, response }) => {
      return parseGraphQLError(name, stack, response);
    },
  }),
  refetchOnMountOrArgChange: true,

  tagTypes: ["Auth", "Users"],
  endpoints: () => ({}),
});
