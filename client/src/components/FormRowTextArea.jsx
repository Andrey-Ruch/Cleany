const FormRowTextArea = ({
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

      <textarea
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        className="form-input form-textarea"
        defaultValue={defaultValue}
        onChange={onChange}
        {...other}
      />
    </div>
  );
};

export default FormRowTextArea;
