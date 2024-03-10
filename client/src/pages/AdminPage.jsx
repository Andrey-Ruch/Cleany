import { redirect } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import {
  MdOutlineWorkOutline,
  MdOutlineCleaningServices,
} from "react-icons/md";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatItem } from "../components";
import { StyleSheetManager } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/users/admin/appStats");

    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    await queryClient.ensureQueryData(statsQuery);

    return null;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const AdminPage = () => {
  const { data } = useQuery(statsQuery);
  const { users, jobs, employees } = data;

  return (
    <Wrapper>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "background"}>
        <StatItem
          title="Current Users"
          count={users}
          color="#e9b949"
          background="#fcefc7"
          icon={<HiOutlineUsers />}
        />
        <StatItem
          title="Total Jobs"
          count={jobs}
          color="#647acb"
          background="#e0e8f9"
          icon={<MdOutlineWorkOutline />}
        />

        <StatItem
          title="Total Employees"
          count={employees}
          color="var(--primary-700)"
          background="var(--primary-100)"
          icon={<MdOutlineCleaningServices />}
        />
      </StyleSheetManager>
    </Wrapper>
  );
};

export default AdminPage;
