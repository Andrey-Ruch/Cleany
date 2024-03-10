import { useState } from "react";
import getPlaces from "../utils/getPlaces";
import { toast } from "react-toastify";

const AddressAutoComplete = ({
  name,
  item,
  placeholder = "",
  setItem,
  types,
  suggestionText,
  helperText,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState(item);

  const handleInputChange = async (searchText) => {
    const suggestions_ = await getPlaces(searchText, types);

    if (types === "address")
      setSuggestions(
        suggestions_.filter((suggestion) =>
          suggestion?.matching_place_name?.includes(helperText)
        )
      );
    else setSuggestions(suggestions_);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const isEmptyValue = value.length === 0;

    setValue(value);

    if (isEmptyValue || item !== value) {
      setItem("");
      setSuggestions([]);
    }

    if (!isEmptyValue) handleInputChange(value);
  };

  const handleSuggestionClick = (suggestion) => {
    try {
      setItem(suggestion[suggestionText]);
      setValue(suggestion[suggestionText]);
    } catch (error) {
      console.log(error);
      toast.warning("Please select a full address");
    }

    setSuggestions([]);
  };
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>

      <div className="custom-select">
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="form-input"
          autoComplete="none"
        />

        <ul className="suggestions">
          {suggestions?.map((suggestion, index) => {
            return (
              <li
                className="suggestion"
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion[suggestionText]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddressAutoComplete;
