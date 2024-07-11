import { Navigate, RouteObject } from "react-router-dom";

const errorRoutes: RouteObject[] = [
  {
    path: "/404",
    element: <>404</>,
  },
  {
    path: "/*",
    element: <Navigate to={"/404"} replace />,
  },
];

export default errorRoutes;
