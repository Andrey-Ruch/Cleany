import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HomePage,
  Landing,
  SignInPage,
  SignUpPage,
  DashboardLayout,
  ErrorPage,
  ProfilePage,
  AboutPage,
  AdminPage,
  PostsLanding,
  PostsPage,
  AddPostPage,
  EditPostPage,
  ExtendedPostPage,
  EmploymentsPage,
} from "./pages";
// actions
import { action as signUpAction } from "./pages/SignUpPage";
import { action as signIpAction } from "./pages/SignInPage";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as postsLoader } from "./pages/PostsPage.jsx";
import { action as addPostAction } from "./pages/AddPostPage";
import { action as editPostAction } from "./pages/EditPostPage";
import { loader as editPostLoader } from "./pages/EditPostPage";
import { action as deletePostAction } from "./pages/DeletePostPage";
import { action as extendedPostAction } from "./pages/ExtendedPostPage";
import { loader as extendedPostLoader } from "./pages/ExtendedPostPage";
import { loader as adminLoader } from "./pages/AdminPage";
import { action as profileAction } from "./pages/ProfilePage";
import { loader as employmentsLoader } from "./pages/EmploymentsPage.jsx";
import Message from "./components/Message.jsx";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

export const checkDefaultDisplay = () => {
  return localStorage.getItem("mapDisplay") === "true";
};

checkDefaultTheme();
checkDefaultDisplay();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      throwOnError: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        action: signUpAction,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
        action: signIpAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <PostsLanding />,
          },
          {
            path: ":route",
            element: <PostsPage />,
            loader: postsLoader(queryClient),
            errorElement: <Message text="There was an error..." />,
          },
          {
            path: ":route/add",
            element: <AddPostPage />,
            action: addPostAction(queryClient),
          },
          {
            path: ":route/edit/:id",
            element: <EditPostPage />,
            loader: editPostLoader(queryClient),
            action: editPostAction(queryClient),
          },
          {
            path: ":route/delete/:id",
            action: deletePostAction(queryClient),
          },
          {
            path: ":route/extended/:id",
            element: <ExtendedPostPage />,
            loader: extendedPostLoader(queryClient),
            action: extendedPostAction(queryClient),
          },
          {
            path: "employments",
            element: <EmploymentsPage />,
            loader: employmentsLoader(queryClient),
          },
          {
            path: "profile",
            element: <ProfilePage />,
            action: profileAction(queryClient),
          },
          {
            path: "stats",
            element: <AdminPage />,
            loader: adminLoader(queryClient),
            errorElement: <Message text="There was an error..." />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
export default App;
