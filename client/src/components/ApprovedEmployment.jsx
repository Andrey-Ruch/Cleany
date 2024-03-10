import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// components
import { Loading } from ".";
// Mui
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
// assets
import jobPlaceHolder from "../assets/images/jobPlaceHolder.png";

const ApprovedEmployment = ({
  employment,
  currentUserRole,
  currentUserId,
  singleUserQuery,
  singleJobQuery,
}) => {
  const { senderId, recipientId, employeeId, jobId } = employment;

  const postId = currentUserRole === "Employer" ? employeeId : jobId;

  const singleJob = useQuery(singleJobQuery(jobId));
  const singleUser = useQuery(
    singleUserQuery(currentUserId === senderId ? recipientId : senderId)
  );

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
        backgroundColor: "var(--background-secondary-color)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <Stack
        sx={{ flexGrow: 1 }}
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Stack sx={{ flexGrow: 1 }} direction="row">
          <ListItemAvatar>
            <Avatar
              src={singleJob.data.job?.image?.url || jobPlaceHolder}
              variant="rounded"
            />
          </ListItemAvatar>

          <ListItemText sx={{ m: "auto" }} disableTypography>
            <strong>{singleJob.data.job.title}</strong>
          </ListItemText>
        </Stack>

        <Stack sx={{ flexGrow: 1 }} direction="row">
          <ListItemAvatar>
            <Avatar src={avatar?.url} />
          </ListItemAvatar>

          <ListItemText sx={{ m: "auto" }} disableTypography>
            <strong>{`${firstName} ${lastName}`}</strong>
          </ListItemText>
        </Stack>

        <Stack>
          <ListItemButton
            sx={{ borderRadius: "var(--border-radius)", padding: 0 }}
          >
            <Link
              to={`/dashboard/${
                userRole === "Employer" ? "jobs" : "employees"
              }/extended/${postId}`}
              style={{ color: "var(--primary-500)" }}
            >
              Give a review
            </Link>
          </ListItemButton>
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default ApprovedEmployment;
