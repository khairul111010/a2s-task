import { RouteObject } from "react-router-dom";
import AppLayout from "../modules/app/components/AppLayout";
import Dashboard from "../modules/dashboard/pages/Dashboard";

const appRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
];

export default appRoutes;
