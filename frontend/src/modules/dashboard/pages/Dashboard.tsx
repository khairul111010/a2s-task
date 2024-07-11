import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../../../store/slices/authSlice";

const Dashboard = () => {
  const auth = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeToken());
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="flex items-center flex-col  justify-center">
      <div className="flex items-center justify-between w-[600px]">
        <div className="font-medium text-xl">
          Hello, {auth && auth.username}
        </div>
        <div
          onClick={handleLogout}
          className="bg-black rounded-lg text-white p-2 cursor-pointer"
        >
          Logout
        </div>
      </div>

      <div className="mt-8">
        <div>Please Enter Amount</div>
      </div>
    </div>
  );
};

export default Dashboard;
