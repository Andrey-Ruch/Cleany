const UploadBtn = ({ label, name, onChange }) => {
  return (
    <>
      <button type="button" className="btn btn-outline">
        <label htmlFor={name}>{label || "Upload"}</label>
      </button>

      <input
        type="file"
        id={name}
        name={name}
        className="form-input"
        accept="image/*"
        hidden
        onChange={onChange}
      />
    </>
  );
};

export default UploadBtn;
