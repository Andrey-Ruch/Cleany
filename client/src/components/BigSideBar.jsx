// style
import Wrapper from "../assets/wrappers/BigSidebar";
// icons
import Logo from "./Logo";
// links
import { NavLinks } from ".";

const BigSideBar = () => {
  return (
    <Wrapper>
      <div
        // className={
        //   showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        // }
        className="sidebar-container show-sidebar"
      >
        <div className="content">
          <header>{/* <Logo /> */}</header>

          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSideBar;
