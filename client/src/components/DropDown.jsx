// react
import { useState } from "react";
// icons
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
// style
import Wrapper from "../assets/wrappers/LogoutContainer";
// context
import { useDashboardContext } from "../pages/DashboardLayout";

const DropDown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, isFetching, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowMenu(!showMenu)}
      >
        {!isFetching && user?.avatar?.url ? (
          <img src={user.avatar.url} alt="avatar" className="img" />
        ) : (
          <FaUserCircle size={25} />
        )}
        {/* {user?.firstName} */}

        <FaCaretDown />
      </button>

      <div className={showMenu ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          <BiLogOut />
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default DropDown;
