import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, blockBtn, text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn ${blockBtn && "btn-block"} ${formBtn && "form-btn"} `}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Loading..." : text || "Submit"}
    </button>
  );
};

export default SubmitBtn;
