import * as Types from '../types.generated';

import { api } from '@/redux/api';
export type GetProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'User', id: string, role: Types.Role } };


export const GetProfileDocument = `
    query GetProfile {
  getProfile {
    id
    role
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    GetProfile: build.query<GetProfileQuery, GetProfileQueryVariables | void>({
      query: (variables) => ({ document: GetProfileDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetProfileQuery, useLazyGetProfileQuery } = injectedRtkApi;

