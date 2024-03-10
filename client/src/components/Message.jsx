import { useRouteError } from "react-router-dom";

const Message = ({ messageType, textType, text }) => {
  const error = useRouteError();

  console.log(error);

  return (
    <div className={`message ${messageType}`}>
      <span className={`text-message ${textType}`}>{text}</span>
    </div>
  );
};

export default Message;
