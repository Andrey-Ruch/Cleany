import { useContext, createContext, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { PostsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const allPostsQuery = (params, route) => {
  const { search, tags, languages, scope, experience, city, sort, rate, page } =
    params;

  return {
    queryKey: [
      route,
      search ?? "",
      tags ?? "House cleaning",
      languages ?? "Hebrew",
      scope ?? "Full-time",
      experience ?? "1-3 years",
      rate ?? "30-50 ₪ per hour",
      city ?? "",
      sort ?? "Newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get(`/${route}`, {
        params,
      });

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const queryParams = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allPostsQuery(queryParams, params.route));

    return { searchValues: { ...queryParams }, route: params.route };
  };

const AllPostsContext = createContext();

const PostsPage = () => {
  const { user } = useOutletContext();
  const { searchValues, route } = useLoaderData();

  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const { data: dataObj, isFetching } = useQuery(
    allPostsQuery(searchValues, route)
  );

  const dataArray = Object.values(dataObj);
  const data = {
    totalPosts: dataArray[0],
    numOfPages: dataArray[1],
    currentPage: dataArray[2],
    posts: dataArray[3],
  };

  return (
    <AllPostsContext.Provider
      value={{
        user,
        route,
        data,
        searchValues,
        isFetching,
        showSearchBar,
        toggleSearchBar,
      }}
    >
      {showSearchBar && <SearchContainer />}
      <PostsContainer />
    </AllPostsContext.Provider>
  );
};

export const useAllPostsContext = () => useContext(AllPostsContext);

export default PostsPage;
