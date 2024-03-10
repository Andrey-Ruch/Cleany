import { Form, redirect, Link } from "react-router-dom";
// style
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
// components
import { Logo, SubmitBtn } from "../components";
import { FormRow, FormRowSelect } from "../components";
import { toast } from "react-toastify";
// utils
import customFetch from "../utils/customFetch";
import { ROLES } from "../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");

    return redirect("/sign-in");
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.msg || "Error\n Please try to connect later"
    );

    return error;
  }
};

const SignUpPage = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />

        <h4>Sign up</h4>

        <FormRowSelect
          name="role"
          options={ROLES}
          closeMenuOnSelect={true}
          required
        />
        <FormRow type="text" name="firstName" labelText="first name" required />
        <FormRow type="text" name="lastName" labelText="last name" required />
        <FormRow type="email" name="email" required />
        <FormRow type="password" name="password" required />

        <SubmitBtn formBtn blockBtn text="Sign up" />

        <p>
          Already have an account?
          <Link to="/sign-in" className="member-btn">
            Sign in
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default SignUpPage;
