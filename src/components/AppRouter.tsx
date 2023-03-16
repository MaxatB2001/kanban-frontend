import { Routes, Route, Navigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../data/constants";
import { authRoutes, publicRoutes } from "../data/routes";
import { useAppSelector } from "../hooks/redux";

const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  return (
    <Routes>
      {isAuth &&
        authRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          );
        })}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      {/* {isAuth ? <Route path="*" element={<Navigate to={HOME_ROUTE}/>}/> : <Route path="*" element={<Navigate to={LOGIN_ROUTE}/>}/>} */}
    </Routes>
  );
};

export default AppRouter;
