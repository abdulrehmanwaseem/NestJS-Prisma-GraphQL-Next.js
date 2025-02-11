import * as Types from '../types.generated';

import { api } from '@/redux/api';
export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', email: string, username: string }> };


export const GetUsersDocument = `
    query GetUsers {
  getUsers {
    email
    username
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    GetUsers: build.query<GetUsersQuery, GetUsersQueryVariables | void>({
      query: (variables) => ({ document: GetUsersDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUsersQuery, useLazyGetUsersQuery } = injectedRtkApi;

