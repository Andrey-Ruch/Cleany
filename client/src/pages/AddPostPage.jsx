import { PostForm } from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "../pages/DashboardLayout";

export const action =
  (queryClient) =>
  async ({ params: { route }, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    formData.delete("tags");
    formData.delete("languages");

    const tags = data.tags.split(", ");
    const languages = data.languages.split(", ");

    tags.forEach((tag) => formData.append("tags", tag));
    languages.forEach((language) => formData.append("languages", language));

    try {
      const res = await customFetch.post(`/${route}`, formData);

      queryClient.invalidateQueries([route]);
      toast.success(res.data.msg);

      return redirect(`/dashboard/${route}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");

      return error;
    }
  };

const AddPostPage = () => {
  const {
    user: { role },
  } = useDashboardContext();

  return (
    <PostForm
      isJobRoute={role !== "Employee"}
      title={`Add ${role !== "Employee" ? "job" : "card"}`}
    />
  );
};

export default AddPostPage;
