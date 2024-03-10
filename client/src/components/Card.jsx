import {
  MdOutlineReadMore,
  MdAccessTimeFilled,
  MdWorkHistory,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { CardMenu, JobInfo, Rating } from ".";
import { format } from "timeago.js";
import jobPlaceHolder from "../assets/images/jobPlaceHolder.png";

const Card = ({
  _id,
  employeeFullName,
  avatarUrl,
  title,
  scope,
  experience,
  createdAt,
  rating,
  route,
  role,
  image,
  isManned,
}) => {
  const isJob = title ? true : false;

  return (
    <Wrapper>
      <header className={`${isJob ? "job" : "employee"}-header`}>
        {isManned && <span className="badge">Manned</span>}
        <span className="img-wrapper">
          {isJob ? (
            image?.url ? (
              <img src={image.url} alt="job-image" className="img" />
            ) : (
              <img src={jobPlaceHolder} alt="job-image" className="img" />
            )
          ) : avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="img avatar" />
          ) : (
            <FaUserCircle size={60} color="var(--grey-300)" />
          )}
        </span>

        <div className="info">
          {isJob && <JobInfo text={format(createdAt)} className="date" />}

          <h5>{isJob ? title : employeeFullName}</h5>

          <Rating rating={rating} readOnly />
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo
            icon={<MdWorkHistory />}
            text={experience}
            className="job-text"
          />
          <JobInfo
            icon={<MdAccessTimeFilled />}
            text={scope}
            className="job-text"
          />
        </div>

        <footer className="actions">
          <Link
            className="btn edit-btn btn-outline"
            to={`/dashboard/${route}/extended/${_id}`}
          >
            <MdOutlineReadMore />
            More info
          </Link>

          {((route === "employees" && role !== "Employer") ||
            (route === "jobs" && role !== "Employee")) && (
            <CardMenu route={route} id={_id} />
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Card;
