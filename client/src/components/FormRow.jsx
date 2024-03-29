const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = "",
  placeholder,
  onChange,
  ...other
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        onChange={onChange}
        {...other}
      />
    </div>
  );
};
export default FormRow;
