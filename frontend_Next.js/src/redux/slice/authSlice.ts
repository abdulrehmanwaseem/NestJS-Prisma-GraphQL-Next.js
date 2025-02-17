import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User as GraphQLUser } from "@/graphql/types.generated";

export type AuthUser = Pick<
  GraphQLUser,
  "id" | "username" | "email" | "role" | "isTwoFAEnabled"
> & {
  profile?: Pick<NonNullable<GraphQLUser["profile"]>, "bio" | "avatar"> | null;
};

interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      action: PayloadAction<{ user: AuthState["user"] }>
    ) => {
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { setAuthenticated, signOut } = authSlice.actions;
