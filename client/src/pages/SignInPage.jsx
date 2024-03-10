import { Form, redirect, Link } from "react-router-dom";
// style
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
// components
import { Logo, SubmitBtn } from "../components";
import { FormRow } from "../components";
import { toast } from "react-toastify";
// utils
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/auth/login", data);

      queryClient.invalidateQueries();

      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error");

      return error;
    }
  };

const SignInPage = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />

        <h4>Sign in</h4>

        <FormRow type="email" name="email" required />
        <FormRow type="password" name="password" required />

        <SubmitBtn formBtn blockBtn text="Sign in" />

        <p>
          New on Cleany?
          <Link to="/sign-up" className="member-btn">
            Create a new account
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default SignInPage;
