import { Link } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/PostsLanding";
import postsLanding from "../assets/images/posts-landing.svg";
import { JOB_TAGS } from "../utils/constants";

const PostsLanding = () => {
  const {
    user: { role },
  } = useDashboardContext();

  return (
    <Wrapper>
      <div>
        <h2>Choose what you are looking for</h2>

        <div className="links">
          <Link
            to={`/dashboard/${role === "Employee" ? "jobs" : "employees"}`}
            className="btn"
          >
            {role === "Employee" ? "Jobs" : "Employees"}
          </Link>

          <Link
            to={`/dashboard/${role === "Employee" ? "employees" : "jobs"}`}
            className="btn"
          >
            {role === "Employee"
              ? "My card"
              : role === "Admin"
              ? "Jobs"
              : "My jobs"}
          </Link>
        </div>

        <h2>
          What you can <span>search</span> or <span>post</span> here
        </h2>

        <div className="container">
          <div className="container-element">
            <ul>
              {JOB_TAGS.map((tag, index) => (
                <li key={index}>{tag.value}</li>
              ))}
            </ul>
          </div>

          <div className="container-element">
            <img src={postsLanding} alt="posts" className="img" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostsLanding;
