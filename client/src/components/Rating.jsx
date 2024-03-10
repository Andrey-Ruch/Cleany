import { useState } from "react";
import Wrapper from "../assets/wrappers/Rating";
import MuiRating from "@mui/material/Rating";

const Rating = ({ rating = null, readOnly = false }) => {
  const [value, setValue] = useState(rating);

  return (
    <Wrapper>
      <MuiRating
        name="rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        readOnly={readOnly}
        size="small"
        precision={0.5}
      />
    </Wrapper>
  );
};

export default Rating;
