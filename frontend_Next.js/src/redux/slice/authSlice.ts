import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; role: string } | null;
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
    logout: (state) => {
      state.user;
    },
  },
});

export const { setAuthenticated, logout } = authSlice.actions;
