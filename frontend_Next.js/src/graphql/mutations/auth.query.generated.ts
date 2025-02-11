import * as Types from "../types.generated";

import { api } from "@/redux/api";
export type SignUpMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "AuthPayload";
    userId: string;
    role?: Types.Role | null;
  };
};

export const SignUpDocument = `
    mutation SignUp($input: CreateUserInput!) {
  signUp(input: $input) {
    userId
    role
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    SignUp: build.mutation<SignUpMutation, SignUpMutationVariables>({
      query: (variables) => ({ document: SignUpDocument, variables }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSignUpMutation } = injectedRtkApi;
