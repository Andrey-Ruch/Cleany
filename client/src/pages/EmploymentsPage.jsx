// react
import { redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
// context
import { useDashboardContext } from "../pages/DashboardLayout";
// components
import { Loading, EmploymentRequest, ApprovedEmployment } from "../components";
// style
import Wrapper from "../assets/wrappers/Employments";
// Mui
import List from "@mui/material/List";

const allEmploymentsQuery = (userId) => {
  return {
    queryKey: ["employments"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employments");

      const requestEmployments = data.employments.filter(
        (employment) =>
          employment.state === "request" && employment.recipientId === userId
      );
      const approveEmployments = data.employments.filter(
        (employment) => employment.state === "approve"
      );

      return { requestEmployments, approveEmployments };
    },
  };
};

const singleUserQuery = (senderId) => {
  return {
    queryKey: ["user", senderId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/users/${senderId}`);

      return data;
    },
  };
};

const singleJobQuery = (jobId, isEnabled = true) => {
  return {
    queryKey: ["job", jobId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${jobId}`);

      return data;
    },
    enabled: isEnabled,
  };
};

export const loader = (queryClient) => async () => {
  try {
    const res = await customFetch.get("/users/currentUser");
    await queryClient.ensureQueryData(allEmploymentsQuery(res.data.user._id));

    return null;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const EmploymentsPage = () => {
  const {
    user: { _id, role },
  } = useDashboardContext();

  const [selectedTab, setSelectedTab] = useState("tab1"); // Default tab1

  const res = useQuery(allEmploymentsQuery(_id));
  const { data, isFetching } = res;

  const handleTabChange = (event) => {
    setSelectedTab(event.target.id);
  };

  return (
    <Wrapper>
      <div className="tab-wrapper">
        <div className="tab-container">
          <input
            type="radio"
            name="tab"
            id="tab1"
            className="tab tab--1"
            checked={selectedTab === "tab1"}
            onChange={handleTabChange}
          />
          <label className="tab_label" htmlFor="tab1">
            Requests
          </label>

          <input
            type="radio"
            name="tab"
            id="tab2"
            className="tab tab--2"
            checked={selectedTab === "tab2"}
            onChange={handleTabChange}
          />
          <label className="tab_label" htmlFor="tab2">
            Approved
          </label>

          <div className="indicator" />
        </div>
      </div>

      {isFetching ? (
        <Loading />
      ) : (
        <>
          {selectedTab === "tab1" &&
            (data.requestEmployments.length === 0 ? (
              "No requests employment..."
            ) : (
              <List sx={{ maxWidth: 400 }} disablePadding>
                {data.requestEmployments.map((employment) => (
                  <EmploymentRequest
                    key={employment._id}
                    currentUserRole={role}
                    employment={employment}
                    singleUserQuery={singleUserQuery}
                    singleJobQuery={singleJobQuery}
                  />
                ))}
              </List>
            ))}

          {selectedTab === "tab2" &&
            (data.approveEmployments.length === 0 ? (
              "No approved employments..."
            ) : (
              <List sx={{ width: { sm: "100%" } }} disablePadding>
                {data.approveEmployments.map((employment) => (
                  <ApprovedEmployment
                    key={employment._id}
                    currentUserRole={role}
                    currentUserId={_id}
                    employment={employment}
                    singleUserQuery={singleUserQuery}
                    singleJobQuery={singleJobQuery}
                  />
                ))}
              </List>
            ))}
        </>
      )}
    </Wrapper>
  );
};

export default EmploymentsPage;
