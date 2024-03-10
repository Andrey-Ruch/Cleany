import { Card, SwitchBtn, Loading, PageBtnContainer, MapContainer } from ".";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllPostsContext } from "../pages/PostsPage";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineFilterList, MdFeaturedPlayList } from "react-icons/md";

const PostsContainer = () => {
  const { isMapDisplay, toggleMapDisplay } = useDashboardContext();
  const {
    user: { role },
    route,
    data,
    isFetching,
    toggleSearchBar,
  } = useAllPostsContext();
  const { posts, totalPosts, numOfPages } = data;

  if (isFetching) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="search-result-header">
        <h5>
          {totalPosts} {route === "jobs" ? "Job" : "Employee"}
          {posts.length > 1 && "s"} found
        </h5>

        <div className="search-result-buttons">
          {!(role === "Employee" && route === "employees") && (
            <button type="button" className="btn" onClick={toggleSearchBar}>
              <div className="icon-container toggle">
                <MdOutlineFilterList />
              </div>
            </button>
          )}

          <SwitchBtn
            checked={isMapDisplay}
            handleChange={toggleMapDisplay}
            firstIcon={<MdFeaturedPlayList />}
            secondIcon={<FaMapMarkedAlt />}
          />
        </div>
      </div>

      {/* Need to check for map and list, for now its only for map */}
      {isMapDisplay && posts.length > 0 ? (
        <MapContainer />
      ) : (
        <div className="jobs">
          {posts.map((post) => {
            return <Card key={post._id} route={route} role={role} {...post} />;
          })}
        </div>
      )}

      {numOfPages > 1 && <PageBtnContainer useContext={useAllPostsContext} />}
    </Wrapper>
  );
};

export default PostsContainer;
