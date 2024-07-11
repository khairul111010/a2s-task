import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const AppLayout: FC = () => {
  //   const [autoLogin] = useLazyAutoLoginQuery();
  const accessToken = localStorage.getItem("/token");
  //   useEffect(() => {
  //     if (accessToken) {
  //       autoLogin();
  //     }
  //   }, []);

  return (
    <div className="text-[14px] min-h-screen bg-[#F3F4F6] flex flex-col">
      <div className="grow py-6 px-8">
        <Outlet />
      </div>
      <div className="p-4 flex justify-center text-sm opacity-60">
        &copy; {new Date().getFullYear()}.
      </div>
    </div>
  );
};

export default AppLayout;
