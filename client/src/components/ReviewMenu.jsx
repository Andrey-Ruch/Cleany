// react
import { useState } from "react";
import { Form } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
// icons
import { MdDeleteForever } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
// style
import Wrapper from "../assets/wrappers/ReviewMenu";

const deleteReview = {
  mutationFn: async ({ queryClient, postType, id }) => {
    const res = await customFetch.delete(`/reviews/${id}`);

    queryClient.invalidateQueries({
      queryKey: [postType],
    });
    queryClient.invalidateQueries({
      queryKey: [`${postType}s`],
    });

    return res.data;
  },
  onSuccess: (data) => {
    toast.success(data.msg);
  },
  onError: (data) => {
    console.log(data);
    toast.error("Something went wrong");
  },
};

const ReviewMenu = ({ postType, id }) => {
  const [showMenu, setShowMenu] = useState(false);

  const queryClient = useQueryClient();
  const deleteReviewMutation = useMutation(deleteReview);

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    deleteReviewMutation.mutate({ queryClient, postType, id });
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowMenu(!showMenu)}
      >
        <BsThreeDotsVertical />
      </button>

      <div className={showMenu ? "dropdown show-dropdown" : "dropdown"}>
        <Form onSubmit={handleDeleteSubmit}>
          <button type="submit" className="dropdown-btn danger-btn">
            <MdDeleteForever />
            Delete
          </button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default ReviewMenu;
