/**
 * ============================================================================
 * File: authInterceptor.js
 * Path: src/api/authInterceptor.js
 * ----------------------------------------------------------------------------
 * Description:
 * Configures Axios request and response interceptors for authenticated API
 * communication.
 *
 * Responsibilities:
 * • Attach JWT access token to every request
 * • Automatically refresh expired access tokens
 * • Retry failed requests after successful refresh
 * • Logout user if refresh token is invalid
 * • Prevent duplicate interceptor registration
 * ============================================================================
 */

// Imports
import axiosClient from "./axiosClient";

import { AUTH_ENDPOINTS } from "./endpoints";

import {
  getTokens,
  saveTokens,
  refreshUserToken,
  logoutUser,
} from "../screens/auth/Login/loginService";

import { mapAuthResponse } from "../utils/auth/authMapper";

import {
  loginSuccess,
  logout,
} from "../redux/auth/authSlice";

/**
 * ============================================================================
 * Interceptor References
 * ============================================================================
 */

let requestInterceptorId = null;

let responseInterceptorId = null;

/**
 * ============================================================================
 * Setup Authentication Interceptors
 * ============================================================================
 *
 * @param {Object} store Redux Store
 */
export const setupAuthInterceptor = (store) => {

  /**
   * Prevent duplicate interceptor registration
   */
  if (requestInterceptorId !== null) {

    axiosClient.interceptors.request.eject(
      requestInterceptorId
    );

  }

  if (responseInterceptorId !== null) {

    axiosClient.interceptors.response.eject(
      responseInterceptorId
    );

  }

  /**
   * ========================================================================
   * Request Interceptor
   * ========================================================================
   */
  requestInterceptorId =
    axiosClient.interceptors.request.use(

      async (config) => {

        const tokens = await getTokens();

        if (tokens?.accessToken) {

          config.headers.Authorization =
            `Bearer ${tokens.accessToken}`;

        }

        return config;

      },

      (error) => Promise.reject(error)

    );

  /**
   * ========================================================================
   * Response Interceptor
   * ========================================================================
   */
  responseInterceptorId =
    axiosClient.interceptors.response.use(

      (response) => response,

      async (error) => {

        /**
         * Network / Timeout Error
         */
        if (!error.response) {

          return Promise.reject(error);

        }

        const originalRequest = error.config;

        /**
         * Refresh Expired Access Token
         */
        if (

          error.response.status === 401 &&

          !originalRequest._retry &&

          originalRequest.url !==
            AUTH_ENDPOINTS.REFRESH_TOKEN

        ) {

          originalRequest._retry = true;

          try {

            /**
             * Retrieve Stored Tokens
             */
            const tokens = await getTokens();

            if (!tokens?.refreshToken) {

              throw new Error(
                "Refresh token not found."
              );

            }

            /**
             * Request New Access Token
             */
            const response =
              await refreshUserToken(
                tokens.refreshToken
              );

            /**
             * Save Updated Tokens
             */
            await saveTokens({

              accessToken: response.accessToken,

              refreshToken: response.refreshToken,

            });

            /**
             * Update Redux Authentication State
             */
            store.dispatch(

              loginSuccess(

                mapAuthResponse(response)

              )

            );

            /**
             * Retry Original Request
             */
            originalRequest.headers.Authorization =
              `Bearer ${response.accessToken}`;

            return axiosClient(
              originalRequest
            );

          } catch (refreshError) {

            /**
             * Refresh Token Invalid
             */
            await logoutUser();

            store.dispatch(
              logout()
            );

            return Promise.reject(
              refreshError
            );

          }

        }

        return Promise.reject(error);

      }

    );

};