// style
import Wrapper from "../assets/wrappers/SmallSidebar";
// icons
import { IoClose } from "react-icons/io5";
import Logo from "./Logo";
// context
import { useDashboardContext } from "../pages/DashboardLayout";
// links
import { NavLinks } from ".";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <IoClose />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
