import onQueryStarted from "@/redux/api/onQueryStarted";
import * as Types from "../types.generated";

import { api } from "@/redux/api";
export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: { __typename?: "User"; username: string; email: string };
};

export const UpdateUserDocument = `
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input) {
    username
    email
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    UpdateUser: build.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
      {
        query: (variables) => ({ document: UpdateUserDocument, variables }),
        invalidatesTags: ["Auth"],
        onQueryStarted,
      }
    ),
  }),
});

export { injectedRtkApi as api };
export const { useUpdateUserMutation } = injectedRtkApi;
