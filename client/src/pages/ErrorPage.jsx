import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFound from "../assets/images/not-found.svg";
import warning from "../assets/images/warning.svg";

const ErrorPage = () => {
  const error = useRouteError();

  console.log(error?.response?.status);

  if (error.status === 404 || error?.response?.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFound} alt="Not Found" />

          <h2>Ohh! Page not found</h2>
          <p>We can't seem to find the page you looking for</p>
          <Link to="/dashboard">Back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <img src={warning} alt="Error" />

        <h2>Error</h2>
        <p>Something went wrong.</p>
        <Link to="/dashboard">Back home</Link>
      </div>
    </Wrapper>
  );
};
export default ErrorPage;
