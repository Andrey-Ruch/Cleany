import Wrapper from "../assets/wrappers/Review";
import { Rating, ReviewMenu, Loading } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { format } from "timeago.js";
import avatarPlaceHolder from "../assets/images/avatarPlaceHolder.png";

const singleUserReviewQuery = (postType, postId, _id, createdBy) => {
  return {
    queryKey: ["user", _id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/users/${createdBy}`);

      return data;
    },
  };
};

const Review = ({ currentUserId, postType, postId, review }) => {
  const { comment, createdAt, rating, createdBy, _id } = review;

  const { isFetching, data } = useQuery(
    singleUserReviewQuery(postType, postId, _id, createdBy)
  );

  if (isFetching) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  const { user } = data;

  return (
    <Wrapper>
      <header className="review-header">
        <img
          src={user?.avatar?.url || avatarPlaceHolder}
          alt="avatar"
          className="img avatar"
        />

        <div className="info">
          <h5>{`${user.firstName} ${user.lastName}`}</h5>

          <p className="date">{format(createdAt)}</p>
        </div>

        {currentUserId === createdBy && (
          <ReviewMenu postType={postType} id={_id} />
        )}
      </header>

      <div className="review-content">
        <Rating rating={rating} readOnly />

        <p>{comment}</p>
      </div>
    </Wrapper>
  );
};

export default Review;
