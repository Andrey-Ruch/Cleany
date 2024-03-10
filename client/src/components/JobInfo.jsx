import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text, className }) => {
  return (
    <Wrapper>
      {icon && <span className="job-icon">{icon}</span>}
      {/* <span className="job-text">{text}</span> */}
      <span className={className}>{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
