import { PostForm } from "../components";
import { useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const singlePostQuery = (route, id) => {
  return {
    queryKey: [route, id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/${route}/${id}`);

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params: { route, id } }) => {
    try {
      await queryClient.ensureQueryData(singlePostQuery(route, id));

      return { route, id };
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

      return redirect(`/dashboard/${route}`);
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params: { route, id } }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    formData.delete("tags");
    formData.delete("languages");

    const tags = data.tags.split(", ");
    const languages = data.languages.split(", ");

    tags.forEach((tag) => formData.append("tags", tag));
    languages.forEach((language) => formData.append("languages", language));

    try {
      const res = await customFetch.patch(`/${route}/${id}`, formData);

      queryClient.invalidateQueries([route]);
      toast.success(res.data.msg);

      return redirect(`/dashboard/${route}`);
    } catch (error) {
      toast.error("Something went wrong");

      return error;
    }
  };

const EditPostPage = () => {
  const { route, id } = useLoaderData();
  const isJobRoute = route === "jobs";
  const { data } = useQuery(singlePostQuery(route, id));

  return (
    <PostForm
      isJobRoute={isJobRoute}
      title={`Edit ${isJobRoute ? "job" : "card"}`}
      obj={data[route.slice(0, -1)]}
    />
  );
};

export default EditPostPage;
