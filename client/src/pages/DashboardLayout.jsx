// react
import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// style
import Wrapper from "../assets/wrappers/Dashboard";
// pages
import { LoadingPage } from "./";
// components
import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";
// functions
import { checkDefaultTheme, checkDefaultDisplay } from "../App";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/currentUser");

    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ queryClient }) => {
  const userData = useQuery(userQuery);
  const { data, isFetching } = userData;
  const { user } = data;

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false); // false
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isMapDisplay, setIsMapDisplay] = useState(checkDefaultDisplay());
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleMapDisplay = () => {
    const newDisplay = !isMapDisplay;
    setIsMapDisplay(newDisplay);
    localStorage.setItem("mapDisplay", newDisplay);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;

    logoutUser();
  }, [isAuthError]);

  if (isFetching) return <LoadingPage />;

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isFetching,
        isDarkTheme,
        isMapDisplay,
        toggleMapDisplay,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />

          <div>
            <Navbar />

            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
