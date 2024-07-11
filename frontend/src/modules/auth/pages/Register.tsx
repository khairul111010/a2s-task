import { Form, Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import TextInput from "../../../components/form/TextInput";
import Button from "../../../components/button";
import { useRegisterMutation } from "../../../store/apis/authApi";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = object().shape({
  username: string().required("Username is required."),
  email: string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters."),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([ref("password"), "Confirm Password is not matching"]),
});

const Register: FC = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values: any) => {
    register({
      username: values.username,
      email: values.email,
      password: values.password,
    })
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
      <div className="text-center font-bold">Register</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        innerRef={formikRef}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextInput
            label="Username"
            name="username"
            placeholder="Enter your username"
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter your email address"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
          <div className="mb-3 text-right">
            <Link className="underline text-sm text-black" to={"/login"}>
              Login?
            </Link>
          </div>
          <Button
            className="w-full"
            variant="primary"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Register
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
