// react-router
import { Link } from "react-router-dom";
// style
import Wrapper from "../assets/wrappers/LandingPage";
// images
import people from "../assets/images/people.svg";
// components
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />

        <Link to="/sign-in" className="btn">
          Sign in
        </Link>
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            The <span>right</span> people.
            <br />
            In <span>one</span> place.
          </h1>

          <p>
            All the people you need are in one place.
            <br />
            Choose what you are looking for and you will find many options.
          </p>
        </div>

        <img src={people} alt="People" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
