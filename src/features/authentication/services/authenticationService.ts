import { authSlice } from './../AuthSlice';
import { myBaseQuery } from './../../../lib/rtkQuery';
import { ISignin } from "./../models/ISignin";
import { ICreateUser } from "./../models/ICreateUser";
import { AuthResponse } from "./../models/AuthResponse";
import { $api } from "../../../lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: ICreateUser, thunkAPI) => {
    try {
      const response = await $api.post<AuthResponse>(
        "/auth/local/signup",
        userData
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (userData: ISignin, thunkAPI) => {
    try {
      const response = await $api.post<AuthResponse>(
        "/auth/local/signin",
        userData
      );
      return response.data;
    } catch (e: any) {      
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: myBaseQuery,
  endpoints: (build) => ({
    signin: build.mutation<AuthResponse, ISignin>({
      query: (userData) => ({
        url: "/auth/local/signin",
        method: "POST",
        body: userData,
        onSucces: async (dispatch, data) => {
          const response = data as AuthResponse
          dispatch(authSlice.actions.login(response))
        }
      })
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      })
    }),
    checkAuth: build.mutation<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        onSucces: async (dispatch, data) => {
          const response = data as AuthResponse
          dispatch(authSlice.actions.login(response))
        }
      })
    })
  })
})

export const {useSigninMutation, useLogoutMutation, useCheckAuthMutation} = authenticationApi