import { RouteObject } from "react-router-dom";
import AuthLayout from "../modules/auth/components/AuthLayout";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";

const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default authRoutes;
