import {
  GetUsersQuery,
  GetUsersQueryVariables,
} from "@/graphql/generatedTypes";
import { api } from "./index";

export const GetUsersDocument = `
    query GetUsers {
  getUsers {
    email
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetUsers: build.query<GetUsersQuery, GetUsersQueryVariables | void>({
      query: (variables) => ({ document: GetUsersDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUsersQuery, useLazyGetUsersQuery } = injectedRtkApi;
