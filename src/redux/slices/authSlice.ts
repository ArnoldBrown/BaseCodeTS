import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
      // Triggered when login is initiated
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    loginFailure: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    logout: (state) => {
        state.isLoggedIn = false;
        state.token = null;
      },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
