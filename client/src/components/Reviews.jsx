import { useExtendedPostContext } from "../pages/ExtendedPostPage";
import Wrapper from "../assets/wrappers/Reviews";
import { AddReview, Review, PageBtnContainer, Loading } from "../components";

const Reviews = () => {
  const {
    user: { _id: currentUserId },
    role,
    postType,
    id: postId,
    data: { reviews, numOfPages },
    isReviewFetching,
  } = useExtendedPostContext();

  if (isReviewFetching) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <h5 className="title">Reviews</h5>

      {((postType === "employee" && role !== "Employee") ||
        (postType === "job" && role !== "Employer")) && <AddReview />}

      {reviews.length > 0
        ? reviews.map((review) => (
            <Review
              key={review._id}
              currentUserId={currentUserId}
              postType={postType}
              postId={postId}
              review={review}
            />
          ))
        : "No reviews..."}

      {numOfPages > 1 && (
        <PageBtnContainer useContext={useExtendedPostContext} />
      )}
    </Wrapper>
  );
};

export default Reviews;
