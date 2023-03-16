import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/AuthSlice";
import workspaceReducer from "../features/workspace/WorkspaceSlice";
import { authenticationApi } from "../features/authentication/services/authenticationService";
import { workpspaceApi } from "../features/workspace";
import { projectApi } from "../features/project";
import sidebarReducer from "./sharedSlices/sidebarSlice"
import projectReducer from "../features/project/projectSlice"

const rootReducer = combineReducers({
  authReducer,
  workspaceReducer,
  sidebarReducer,
  projectReducer,
  [authenticationApi.reducerPath]:authenticationApi.reducer,
  [workpspaceApi.reducerPath]: workpspaceApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(authenticationApi.middleware, projectApi.middleware, workpspaceApi.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']
