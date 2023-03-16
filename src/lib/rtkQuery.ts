import { AppDispatch } from './../store/store';
import { AuthResponse } from './../features/authentication/models/AuthResponse';
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Dispatch } from '@reduxjs/toolkit';

interface CustomFetchArgs extends FetchArgs {
  onSucces?: (dispatch: Dispatch, data: unknown) => Promise<void>
}

const baseQuery = fetchBaseQuery({baseUrl: "http://localhost:3000", credentials: "include", prepareHeaders(headers, api) {
    const at: AuthResponse = JSON.parse(localStorage.getItem('tokens') || "false") 
  
    if (at) {
      headers.set('authorization', `Bearer ${at.accessToken}`)
    }
}, });
export const myBaseQuery: BaseQueryFn<
  CustomFetchArgs,
  unknown,  
  FetchBaseQueryError
> = async (args, api,  extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (!result.error && args.onSucces) {
    args.onSucces(api.dispatch, result.data)
    return {
      data: result.data
    }
  } else if(!result.error) {
    return {
      data: result.data
    }
  } else {
    console.log(result.error);
    
    return {
      error: result.error
    }
  }
};
