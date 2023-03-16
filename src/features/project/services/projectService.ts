import { ICreateProject } from "./../models/ICreateProject";
import { IProject } from "./../models/IProject";
import { createApi } from "@reduxjs/toolkit/query/react";
import { myBaseQuery } from "../../../lib/rtkQuery";
import {ProjectSlice} from "../projectSlice";
export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: myBaseQuery,
  endpoints: (build) => ({
    createProject: build.mutation<IProject, ICreateProject>({
      query: (body) => ({
        url: "/project",
        method: "POST",
        body,
      }),
    }),
    getProject: build.query<IProject, string>({
      query: (id: string) => ({
        url: `/project/${id}`,
        onSucces: async (dispatch, data) => {
          const response = data as IProject
          dispatch(ProjectSlice.actions.setCurrentProject(response))
        }
      }),
    }),
  }),
});

export const {useCreateProjectMutation, useGetProjectQuery} = projectApi