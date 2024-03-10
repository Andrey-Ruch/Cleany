// context
import { useDashboardContext } from "../pages/DashboardLayout";
// links
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {
  const {
    toggleSidebar,
    user: { role },
  } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, icon } = link;

        if (text === "add post")
          link.path = `${role === "Employee" ? "employees" : "jobs"}/add`;

        // Admin paths
        if (text === "stats" && role !== "Admin") return;

        if (
          (text === "add post" || text === "posts" || text === "employments") &&
          role === "Admin"
        )
          return;

        // Other paths
        return (
          <NavLink
            to={link.path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">
              {icon}
            </span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
