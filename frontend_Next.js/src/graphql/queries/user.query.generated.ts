import * as Types from '../types.generated';

import { api } from '@/redux/api';
export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', email: string, username: string, id: string }> };

export type GetUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUser: { __typename?: 'User', email: string, username: string } };


export const GetUsersDocument = `
    query GetUsers {
  getUsers {
    email
    username
    id
  }
}
    `;
export const GetUserByIdDocument = `
    query GetUserById($id: String!) {
  getUser(id: $id) {
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
    GetUserById: build.query<GetUserByIdQuery, GetUserByIdQueryVariables>({
      query: (variables) => ({ document: GetUserByIdDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUsersQuery, useLazyGetUsersQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery } = injectedRtkApi;

