import { configureStore } from "@reduxjs/toolkit";

// Import Authentication Reducer
import authReducer from "./auth/authSlice";

// Create Redux Store
export const store = configureStore({
  reducer: {
    // Authentication State
    auth: authReducer,
  },
});