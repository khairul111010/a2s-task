import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../../../store/slices/authSlice";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  useConfirmPaymentMutation,
  useGetPaymentStatusQuery,
  useLazyGetPaymentStatusQuery,
  useMakePaymentMutation,
} from "../../../store/apis/paymentApi";
import { Form, Formik, FormikProps } from "formik";
import { number, object } from "yup";
import TextInput from "../../../components/form/TextInput";
import Button from "../../../components/button";
import toast from "react-hot-toast";

const initialValues = {
  amount: null,
};

const validationSchema = object().shape({
  amount: number().required("amount is required."),
});

const Dashboard = () => {
  const formikRef = useRef<FormikProps<any>>(null);

  const [paymentIntentId, setPaymentIntentId] = useState<string>("");

  const [getPaymentStatus, { data }] = useLazyGetPaymentStatusQuery();
  const [makePayment, { isLoading: makingPayment }] = useMakePaymentMutation();
  const [confirmPayment, { isLoading: confirmingPayment }] =
    useConfirmPaymentMutation();

  const auth = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    dispatch(removeUser());
    navigate("/login");
  };

  const handleSubmit = (values: any) => {
    try {
      makePayment(values)
        .unwrap()
        .then((res: any) => {
          setPaymentIntentId(res.client_id);
          toast.success("Successfully Intented");
        });
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      confirmPayment({ paymentIntentId })
        .unwrap()
        .then(() => {
          setPaymentIntentId("");
          toast.success("Successfully Confirmed");
        });
    } catch (error) {
      console.error("Error confirming payment", error);
    }
  };

  useEffect(() => {
    getPaymentStatus();
  }, []);

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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextInput name="amount" placeholder="Please Enter Amount" />
            {!paymentIntentId && (
              <Button
                className="w-full"
                variant="primary"
                type="submit"
                loading={makingPayment}
                disabled={makingPayment}
              >
                Pay
              </Button>
            )}
          </Form>
        </Formik>

        {paymentIntentId && (
          <Button
            className="w-full"
            onClick={handleConfirmPayment}
            loading={confirmingPayment}
            disabled={confirmingPayment}
          >
            Confirm Payment
          </Button>
        )}
      </div>

      <div className="mt-10 font-semibold text-base mb-2">
        List of transactions
      </div>
      {data && data.length > 0 ? (
        <table className="w-[600px] border-2 border-gray-700">
          <tr className="w-full border">
            <th className="border">ID</th>
            <th className="border">Amount</th>
            <th className="border">Status</th>
          </tr>
          {data &&
            data.map((item: any, index: number) => {
              return (
                <tr className="border">
                  <th className="border">{index + 1}</th>
                  <th className="border">{item.amount / 100}</th>
                  <th className="border">{item.status}</th>
                </tr>
              );
            })}
        </table>
      ) : (
        <div>No Transactions</div>
      )}
    </div>
  );
};

export default Dashboard;
