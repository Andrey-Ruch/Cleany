import ReactSwitch from "react-switch";

const SwitchBtn = ({ checked, firstIcon, secondIcon, handleChange }) => {
  return (
    <ReactSwitch
      checked={checked}
      onChange={handleChange}
      height={30}
      width={65}
      borderRadius={8}
      handleDiameter={23}
      onColor="#2771e0"
      offColor="#2771e0"
      activeBoxShadow={null}
      boxShadow="var(--shadow-1)"
      checkedIcon={
        <div className="icon-container" style={{ color: "white" }}>
          {firstIcon}
        </div>
      }
      uncheckedIcon={
        <div className="icon-container" style={{ color: "white" }}>
          {secondIcon}
        </div>
      }
      checkedHandleIcon={
        <div className="icon-container" style={{ color: "#2771e0" }}>
          {secondIcon}
        </div>
      }
      uncheckedHandleIcon={
        <div className="icon-container" style={{ color: "#2771e0" }}>
          {firstIcon}
        </div>
      }
      className="react-switch"
    />
  );
};

export default SwitchBtn;
