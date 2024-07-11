import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appRoutes from "./AppRoutes";
import authRoutes from "./AuthRoutes";
import errorRoutes from "./ErrorRoutes";
import App from "../modules/app/components/App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [...authRoutes, ...appRoutes, ...errorRoutes],
  },
]);

const Routes: FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
