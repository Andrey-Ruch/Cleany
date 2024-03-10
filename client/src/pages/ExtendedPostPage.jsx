import { useContext, createContext } from "react";
import Wrapper from "../assets/wrappers/Job";
import {
  MdOutlineLanguage,
  MdWorkHistory,
  MdAccessTimeFilled,
} from "react-icons/md";
import { FaUserCircle, FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";
import { useLoaderData, useOutletContext, redirect } from "react-router-dom";
import { JobInfo, Reviews, Rating, Loading, Request } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import jobPlaceHolder from "../assets/images/jobPlaceHolder.png";

const singlePostQuery = (route, postType, id) => {
  return {
    queryKey: [postType, id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/${route}/${id}`);

      return data;
    },
  };
};

const reviewsQuery = (params, postType, id) => {
  const { page } = params;

  return {
    queryKey: [postType, id, "reviews", page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get(`/reviews/${id}`, {
        params,
      });

      return data;
    },
  };
};

const userEmploymentsQuery = ({ role, _id: userId }, postId) => {
  return {
    queryKey: ["employments sender", userId],
    queryFn: async () => {
      const { data } = await customFetch.get("/employments/sender", {
        params: { postId },
      });

      return data;
    },
    enabled: role !== "Admin",
    staleTime: 0,
  };
};

export const action =
  (queryClient) =>
  async ({ request, params: { route, id } }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const postType = route.slice(0, -1);

    if (data.rating === "") {
      toast.error("Rating is required");
      return null;
    }

    try {
      const res = await customFetch.post(`/reviews/${id}`, data);

      queryClient.invalidateQueries({
        queryKey: [postType],
      });
      queryClient.invalidateQueries([route]);
      toast.success(res.data.msg);

      return redirect(`/dashboard/${route}/extended/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

      return error;
    }
  };

export const loader =
  (queryClient) =>
  async ({ params: { route, id }, request }) => {
    try {
      const postType = route.slice(0, -1);

      const queryParams = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);

      await queryClient.ensureQueryData(singlePostQuery(route, postType, id));
      await queryClient.ensureQueryData(
        reviewsQuery(queryParams, postType, id)
      );

      return { searchValues: { ...queryParams }, route, postType, id };
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");

      return redirect(`/dashboard/${route}`);
    }
  };

const ExtendedPostContext = createContext();

const ExtendedPostPage = () => {
  const { user } = useOutletContext();
  const { role } = user;
  const { searchValues, route, postType, id } = useLoaderData();

  const singlePost = useQuery(singlePostQuery(route, postType, id));
  const reviews = useQuery(reviewsQuery(searchValues, postType, id));
  const userEmployments = useQuery(userEmploymentsQuery(user, id));

  if (
    singlePost.isFetching ||
    reviews.isLoading ||
    userEmployments.isLoading ||
    userEmployments.isFetching
  ) {
    return <Loading />;
  }

  const post = singlePost.data[postType];

  const {
    description,
    tags,
    scope,
    address,
    experience,
    rate,
    languages,
    rating,
    isManned,
  } = post;

  // postType
  const isJob = postType === "job";

  // Extra postType fields
  const title = post?.title || post.employeeFullName;
  const imageUrl = post.image?.url || post.avatarUrl;

  return (
    <ExtendedPostContext.Provider
      value={{
        user,
        role,
        postType,
        id, // postId
        data: reviews.data,
        isReviewFetching: reviews.isFetching,
      }}
    >
      <Wrapper>
        <header className={isJob ? "job-header" : "employee-header"}>
          {isManned && <span className="badge">Manned</span>}
          <span className="img-wrapper extended-img-wrapper">
            {isJob ? (
              imageUrl ? (
                <img src={imageUrl} alt="job-image" className="img" />
              ) : (
                <img src={jobPlaceHolder} alt="job-image" className="img" />
              )
            ) : imageUrl ? (
              <img src={imageUrl} alt="avatar" className="img avatar" />
            ) : (
              <FaUserCircle size={60} color="var(--grey-300)" />
            )}
          </span>

          <div className="info">
            <h5>{title}</h5>

            <Rating rating={rating} readOnly />

            <p>{tags.join(", ")}</p>
          </div>
        </header>

        <div className="content extended-gap">
          <JobInfo className="job-text" text={description} />

          <div className="content-center extended-gap">
            <JobInfo
              icon={<FaMapMarkerAlt />}
              text={address}
              className="job-text"
            />

            <JobInfo
              icon={<MdAccessTimeFilled />}
              text={scope}
              className="job-text"
            />

            <JobInfo
              icon={<MdWorkHistory />}
              text={experience}
              className="job-text"
            />

            <JobInfo icon={<FaMoneyBill />} text={rate} className="job-text" />

            <JobInfo
              icon={<MdOutlineLanguage />}
              text={languages.join(", ")}
              className="job-text"
            />
          </div>
        </div>
      </Wrapper>

      {((role === "Employer" && route === "employees") ||
        (role === "Employee" && route === "jobs")) &&
        !isManned && (
          <Request
            currentUser={user}
            currentUserRole={role}
            currentUserEmployments={userEmployments.data}
            post={post}
          />
        )}

      <Reviews />
    </ExtendedPostContext.Provider>
  );
};

export const useExtendedPostContext = () => useContext(ExtendedPostContext);

export default ExtendedPostPage;
