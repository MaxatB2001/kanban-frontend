import { createApi } from '@reduxjs/toolkit/query/react';
import { myBaseQuery } from '../../../lib/rtkQuery';
import { ICreateWorkspace } from '../models/ICreateWorkspace';
import { IWorkspace } from '../models/IWorkspace';

export const workpspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: myBaseQuery,
  endpoints: (build) => ({
    createWorkspace: build.mutation<IWorkspace, ICreateWorkspace>({
      query: (body) => ({
        url: "/workspace",
        method: "POST",
        body
      })
    }),
    getWorkspaces: build.query<Array<IWorkspace>, void>({
      query: () => ({
        url: "/workspace/userWorkspaces"
      })
    }),
    getWorkspace: build.query<IWorkspace, string>({
      query: (id: string) => ({
        url: `workspace/${id}`
      })
    })
  })
})

export const {useCreateWorkspaceMutation, useGetWorkspacesQuery, useGetWorkspaceQuery} = workpspaceApi;