import { Form, Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import TextInput from "../../../components/form/TextInput";
import Button from "../../../components/button";
import { useLoginMutation } from "../../../store/apis/authApi";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = object().shape({
  email: string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters."),
});

const Login: FC = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: any) => {
    login(values)
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.data) {
          formikRef.current?.setErrors(error.data);
        }
      });
  };

  return (
    <>
      <div className="text-center font-bold">Login</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        innerRef={formikRef}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="username"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <div className="mb-3 text-right">
            <Link className="underline text-sm text-black" to={"/register"}>
              Register?
            </Link>
          </div>
          <Button
            className="w-full"
            variant="primary"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Log In
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
