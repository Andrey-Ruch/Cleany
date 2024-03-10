import { Link } from "react-router-dom";
// style
import Wrapper from "../assets/wrappers/Navbar";
// icons
import { FiMenu, FiChevronsLeft } from "react-icons/fi";
import Logo from "./Logo";
// components
import { DropDown, ThemeToggle } from ".";
// context
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        {/* <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          {showSidebar ? (
            <FiChevronsLeft className="left-arrows" />
          ) : (
            <FiMenu />
          )}
        </button> */}

        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>

        <Link to="/dashboard">
          <Logo />
        </Link>

        <div className="btn-container">
          <ThemeToggle />
          <DropDown />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
