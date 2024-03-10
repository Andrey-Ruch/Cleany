import { useState } from "react";
import getPlaces from "../utils/getPlaces";
import { toast } from "react-toastify";

const AutoCompleteAddress = ({ setAddress, placeName }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [fullAddress, setFullAddress] = useState(placeName);

  const handleInputChange = async (searchText) => {
    const suggestions_ = await getPlaces(searchText, "address");
    setSuggestions(suggestions_);
  };

  const handleChange = (e) => {
    setFullAddress(e.target.value);
    handleInputChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    try {
      const fullAddress =
        suggestion?.matching_place_name || suggestion.place_name;
      const longitude = suggestion.center[0];
      const latitude = suggestion.center[1];

      const address = {
        fullAddress,
        place: "",
        country: "",
        latitude,
        longitude,
      };

      suggestion?.context.forEach((element) => {
        const identifier = element.id.split(".")[0];
        address[identifier] = element.text;
      });

      setFullAddress(fullAddress);
      setAddress(address);
    } catch (error) {
      console.log(error);
      setFullAddress("");
      toast.warning("Please select a full address");
    }

    setSuggestions([]);
  };

  return (
    <div className="form-row">
      <label htmlFor="address" className="form-label">
        address
      </label>

      <div className="custom-select">
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Street with number, City, Country"
          autoComplete="off"
          value={fullAddress}
          onChange={handleChange}
          className="form-input"
          required
        />

        <ul className="suggestions">
          {suggestions?.map((suggestion, index) => (
            <li
              className="suggestion"
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.matching_place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
