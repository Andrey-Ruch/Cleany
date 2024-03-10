import Select from "react-select";

const styles = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      minHeight: "var(--input-height)",
      backgroundColor: "var(--background-color)",
      borderRadius: "var(--border-radius)",
      borderColor: "var(--border-color)",
      "&:hover": { borderColor: "var(--primary-500)", outline: "0 !important" },
      "&:active": {
        borderColor: "var(--primary-500)",
        outline: "0 !important",
      },
      transition: "var(--transition)",
    };
  },
  valueContainer: (baseStyles, state) => {
    return {
      ...baseStyles,
      padding: "0.375rem 0.75rem",
    };
  },
  singleValue: (baseStyles, state) => {
    return {
      ...baseStyles,
      fontSize: "var(--small-text)",
      color: "var(--text-color)",
    };
  },
  placeholder: (baseStyles, state) => {
    return {
      ...baseStyles,
      marginLeft: 0,
      marginRight: 0,
      fontSize: "var(--small-text)",
    };
  },
  option: (baseStyles, state) => {
    return {
      ...baseStyles,
      fontSize: "var(--small-text)",
      color: "var(--text-color)",
      transition: "var(--transition)",
      cursor: "pointer",
      backgroundColor: "var(--background-color)",
      "&:hover": {
        backgroundColor: "var(--primary-500)",
        color: "white",
      },
    };
  },
  menu: (baseStyles, state) => {
    return {
      ...baseStyles,
      backgroundColor: "var(--background-color)",
    };
  },
  multiValueRemove: (baseStyles, state) => {
    return {
      ...baseStyles,
      cursor: "pointer",
      color: "var(--grey-900)",
      ":hover": {
        backgroundColor: "var(--red-light)",
        color: "var(--red)",
      },
    };
  },
  indicatorsContainer: (baseStyles, state) => {
    return {
      ...baseStyles,
      cursor: "pointer",
    };
  },
};

const FormRowSelect = ({
  name,
  labelText,
  options,
  defaultValue = [],
  closeMenuOnSelect,
  onChange,
  ...other
}) => {
  const defaultOptions = options.filter((option) =>
    defaultValue.includes(option.value)
  );

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <Select
        inputId={name}
        name={name}
        defaultValue={defaultOptions}
        options={options}
        isSearchable={false}
        closeMenuOnSelect={closeMenuOnSelect}
        onChange={onChange}
        styles={styles}
        delimiter=", "
        {...other}
      />
    </div>
  );
};
export default FormRowSelect;
