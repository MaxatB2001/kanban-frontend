import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { myBaseQuery } from "../../../lib/rtkQuery";

export const taskService = createApi({
  reducerPath: "/task",
  baseQuery: myBaseQuery,
  endpoints: (build) => ({
    
  })
})