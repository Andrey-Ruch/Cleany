import Wrapper from "../assets/wrappers/AddReview";
import { Rating, SubmitBtn } from "../components";
import { Form } from "react-router-dom";

const AddReview = () => {
  return (
    <Wrapper>
      <Form method="post">
        <Rating />

        <textarea
          placeholder="Write your review..."
          type="text"
          id="comment"
          name="comment"
          className="form-input  form-textarea"
          required
        />

        <SubmitBtn text="Post" formBtn />
      </Form>
    </Wrapper>
  );
};

export default AddReview;
