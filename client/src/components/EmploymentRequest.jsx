// react
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// components
import { Loading } from ".";
// Mui
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const deleteEmployment = {
  mutationFn: async ({ queryClient, employmentId }) => {
    const res = await customFetch.delete(`/employments/${employmentId}`);

    queryClient.invalidateQueries({
      queryKey: ["employments"],
    });

    return res.data;
  },
  // onSuccess: (data) => {
  //   toast.success(data.msg);
  // },
  onError: (data) => {
    console.log(data);
    toast.error("Something went wrong");
  },
};

const updateEmployment = {
  mutationFn: async ({ queryClient, employmentId }) => {
    const res = await customFetch.patch(`/employments/${employmentId}`);

    queryClient.invalidateQueries({
      queryKey: ["employments"],
    });

    return res.data;
  },
  onSuccess: () => {
    toast.success("Approved successfully");
  },
  onError: (data) => {
    console.log(data);
    toast.error("Something went wrong");
  },
};

const EmploymentRequest = ({
  employment,
  currentUserRole,
  singleUserQuery,
  singleJobQuery,
}) => {
  const {
    _id: employmentId,
    senderId,
    employeeId,
    jobId,
    createdAt,
  } = employment;
  const postId = currentUserRole === "Employer" ? employeeId : jobId;

  const singleJob = useQuery(singleJobQuery(jobId));
  const singleUser = useQuery(singleUserQuery(senderId));
  const deleteEmploymentMutation = useMutation(deleteEmployment);
  const updateEmploymentMutation = useMutation(updateEmployment);
  const queryClient = useQueryClient();

  const handleDelete = (event) => {
    event.preventDefault();
    deleteEmploymentMutation.mutate({ queryClient, employmentId });
  };

  const handleApprove = (event) => {
    event.preventDefault();
    updateEmploymentMutation.mutate({ queryClient, employmentId });
  };

  if (singleUser.isFetching || singleJob.isFetching) {
    return <Loading />;
  }

  const {
    user: { firstName, lastName, avatar, role: userRole },
  } = singleUser.data;

  return (
    <ListItem
      sx={{
        mb: 2,
        p: 2.5,
        alignItems: "flex-start",
        backgroundColor: "var(--background-secondary-color)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <ListItemAvatar>
        <Avatar src={avatar?.url} />
      </ListItemAvatar>

      <Stack sx={{ flexGrow: 1 }}>
        <ListItemText
          sx={{ m: 0 }}
          disableTypography
          primary={
            <Box
              sx={{
                mb: 0.5,
              }}
            >
              <strong>{`${firstName} ${lastName}`}</strong>
              <span>
                sent you a employment request
                <br />
              </span>

              <span>
                <strong>Job:</strong> {singleJob.data.job.title}
              </span>
            </Box>
          }
          secondary={
            <Stack direction="column" alignItems="start">
              <span className="date">{format(createdAt)}</span>
              <Link
                to={`/dashboard/${
                  userRole === "Employer" ? "jobs" : "employees"
                }/extended/${postId}`}
                style={{ color: "var(--primary-500)" }}
              >
                More info
              </Link>
            </Stack>
          }
        />

        <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
          <button className="btn" onClick={handleApprove}>
            {updateEmploymentMutation.isPending ? "Loading..." : "Approve"}
          </button>

          <button className="btn btn-outline" onClick={handleDelete}>
            {deleteEmploymentMutation.isPending ? "Loading..." : "Cancel"}
          </button>
        </Stack>
      </Stack>
    </ListItem>
  );
};
export default EmploymentRequest;
