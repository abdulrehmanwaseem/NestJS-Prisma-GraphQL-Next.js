import * as Types from '../types.generated';

import { api } from '@/redux/api';
export type SignUpMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthPayload', userId: string, role?: Types.Role | null } };

export type SignInMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', userId: string, role?: Types.Role | null, requires2FA?: boolean | null } };

export type SignOutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };


export const SignUpDocument = `
    mutation SignUp($input: CreateUserInput!) {
  signUp(input: $input) {
    userId
    role
  }
}
    `;
export const SignInDocument = `
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    userId
    role
    requires2FA
  }
}
    `;
export const SignOutDocument = `
    mutation SignOut {
  signOut
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    SignUp: build.mutation<SignUpMutation, SignUpMutationVariables>({
      query: (variables) => ({ document: SignUpDocument, variables })
    }),
    SignIn: build.mutation<SignInMutation, SignInMutationVariables>({
      query: (variables) => ({ document: SignInDocument, variables })
    }),
    SignOut: build.mutation<SignOutMutation, SignOutMutationVariables | void>({
      query: (variables) => ({ document: SignOutDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = injectedRtkApi;

