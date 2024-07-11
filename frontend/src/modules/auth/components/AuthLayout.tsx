import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-full max-w-[420px] m-auto bg-white p-8 rounded-xl shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
