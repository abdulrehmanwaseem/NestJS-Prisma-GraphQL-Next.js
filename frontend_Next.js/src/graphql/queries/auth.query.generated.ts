import * as Types from "../types.generated";

import { api } from "@/redux/api";
export type GetProfileQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetProfileQuery = {
  __typename?: "Query";
  getProfile: {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
    role: Types.Role;
    profile?: { __typename?: "Profile"; bio: string; avatar: string } | null;
  };
};

export const GetProfileDocument = `
    query GetProfile {
  getProfile {
    id
    username
    email
    role
    profile {
      bio
      avatar
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    GetProfile: build.query<GetProfileQuery, GetProfileQueryVariables | void>({
      query: (variables) => ({ document: GetProfileDocument, variables }),
      providesTags: ["Auth"],
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetProfileQuery, useLazyGetProfileQuery } = injectedRtkApi;
