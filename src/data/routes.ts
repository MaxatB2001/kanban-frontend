import Board from "../pages/Board";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Project from "../pages/Project";
import Signup from "../pages/Signup";
import TaskPage from "../pages/TaskPage";
import User from "../pages/User";
import Workspace from "../pages/Workspace";
import { SIGNUP_ROUTE, LOGIN_ROUTE, HOME_ROUTE, WORKSPACE_ROUTE, USER_ROUTE, PROJECT_ROUTE, BOARD } from "./constants";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: Login,
  },
  {
    path: SIGNUP_ROUTE,
    component: Signup,
  },
];

export const authRoutes = [
  {
    path: HOME_ROUTE,
    component: Home,
  },
  {
    path: `${WORKSPACE_ROUTE}/:id`,
    component: Workspace
  },
  {
    path: USER_ROUTE,
    component: User,
  },
  {
    path: `${PROJECT_ROUTE}/:id`,
    component: Project,
  },
  {
    path: `${PROJECT_ROUTE}/:id/board`,
    component: Board
  },
  {
    path: `${PROJECT_ROUTE}/:id/board/:taskId`,
    component: Board
  },
];
