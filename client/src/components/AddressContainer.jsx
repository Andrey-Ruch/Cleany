import { useState } from "react";
import { AddressAutoComplete } from ".";

const AddressContainer = ({ defaultValue = "" }) => {
  const [city, setCity] = useState(defaultValue);

  return (
    <AddressAutoComplete
      name="city"
      item={city}
      setItem={setCity}
      types="place"
      suggestionText="text"
    />
  );
};

export default AddressContainer;
