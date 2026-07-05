import { createSlice } from "@reduxjs/toolkit";

// Initial authentication state when the app starts
const initialState = {
  // Indicates whether the user is logged in
  isAuthenticated: false,

  // Stores logged-in user details
  user: null,

  // JWT Access Token
  accessToken: null,

  // JWT Refresh Token
  refreshToken: null,
};

// Create Authentication Slice
const authSlice = createSlice({
  // Unique name of this slice
  name: "auth",

  // Initial state of authentication
  initialState,

  // Reducers (functions that modify the state)
  // We'll add login, logout, etc. here later.
  reducers: {},
});

// Export reducer to be registered in Redux Store
export default authSlice.reducer;