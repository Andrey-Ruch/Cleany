// icons
import { RiSunLine, RiMoonLine } from "react-icons/ri";
// style
import Wrapper from "../assets/wrappers/ThemeToggle";
// context
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <RiSunLine size={20} className="toggle-icon" />
      ) : (
        <RiMoonLine size={20} />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
