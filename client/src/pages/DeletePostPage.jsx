import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ params: { route, id } }) => {
    try {
      const res = await customFetch.delete(`/${route}/${id}`);
      queryClient.invalidateQueries([route]);
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    return redirect(`/dashboard/${route}`);
  };
