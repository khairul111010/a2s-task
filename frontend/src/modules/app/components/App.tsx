import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { BaseState } from "../../../store";
import { setToken, setUser } from "../../../store/slices/authSlice";

const App: FC = () => {
  const { user } = useSelector((state: BaseState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const localAccessToken = localStorage.getItem("token");
  const localUser = localStorage.getItem("user");
  useEffect(() => {
    if (!localAccessToken && !localUser) {
      navigate("/login");
    } else {
      dispatch(setToken(localAccessToken));
      dispatch(setUser(JSON.parse(localUser as string)));
    }
  }, []);

  useEffect(() => {
    if (!user && !localAccessToken && !localUser) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
