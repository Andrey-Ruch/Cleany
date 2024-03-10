import { useState, useRef } from "react";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import jobPlaceHolder from "../assets/images/jobPlaceHolder.png";
// Mui
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const sendRequest = {
  mutationFn: async ({ requestData, queryClient }) => {
    const res = await customFetch.post("/employments", { ...requestData });

    queryClient.invalidateQueries({ queryKey: ["employments sender"] });

    return res.data;
  },
  onSuccess: () => {
    toast.success("Sent successfully");
  },
  onError: (data) => {
    console.log(data);
    toast.error("Something went wrong");
  },
};

const Request = ({
  currentUser,
  currentUserRole,
  currentUserEmployments,
  post,
}) => {
  const isCurrentUserEmployer = currentUserRole === "Employer";
  const { isDisabled, isRequested, isPending, isApproved } =
    currentUserEmployments;

  if (isDisabled || isRequested || isPending || isApproved) {
    return (
      <Wrapper>
        <button className="btn disabled-btn" disabled>
          {isDisabled &&
            `Send ${isCurrentUserEmployer ? "request" : "candidacy"}`}

          {isRequested && "Requested"}

          {isPending && "Pending"}

          {isApproved && "Approved"}
        </button>
      </Wrapper>
    );
  }

  const ref = useRef();
  const [selected, setSelected] = useState([]);
  const queryClient = useQueryClient();
  const sendRequestMutation = useMutation(sendRequest);

  // console.log(currentUserEmployments);

  const getRequestData = () => {
    const requestData = {
      senderId: currentUser._id,
      recipientId: post.createdBy,
      jobsIds: isCurrentUserEmployer ? [...selected] : [post._id],
      employeeId: isCurrentUserEmployer
        ? post._id
        : currentUserEmployments.notEmployed[0]._id,
    };

    return requestData;
  };

  const sendRequestFunc = () => {
    const requestData = getRequestData();
    sendRequestMutation.mutate({ requestData, queryClient });
  };

  const handleRequestClick = (event) => {
    event.preventDefault();

    if (isCurrentUserEmployer) {
      ref.current.showModal();
      return;
    }

    sendRequestFunc();
  };

  const handleDialogSubmit = () => {
    sendRequestFunc();
    handleClose();
  };

  const handleSelectClick = (event) => {
    let newSelected = [];

    if (event.target.checked) {
      newSelected = [...selected, event.target.id];
    } else {
      newSelected = selected.filter((jodId) => jodId !== event.target.id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClose = () => {
    ref.current.close();
    setSelected([]);
  };

  return (
    <Wrapper>
      <button className="btn success-btn" onClick={handleRequestClick}>
        {sendRequestMutation.isPending
          ? "Loading..."
          : `Send ${isCurrentUserEmployer ? "request" : "candidacy"}`}
      </button>

      {isCurrentUserEmployer && (
        <dialog ref={ref}>
          <span className="title">Jobs</span>

          {/* {selected && console.log(selected)} */}

          <TableContainer>
            <Table>
              <TableHead />

              <TableBody>
                {currentUserEmployments.notEmployed.map(
                  (currentUserCheckedPost) => {
                    const { _id, title, image } = currentUserCheckedPost;
                    const isItemSelected = isSelected(_id);

                    return (
                      <TableRow key={_id} variant="rounded">
                        <TableCell padding="checkbox">
                          <Checkbox
                            id={_id}
                            checked={isItemSelected}
                            onChange={handleSelectClick}
                          />
                        </TableCell>

                        <TableCell
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Avatar
                            variant="rounded"
                            alt={"Job image"}
                            src={image?.url || jobPlaceHolder}
                            sx={{ mr: 2, width: 48, height: 48 }}
                          />

                          <span className="job-title">{title}</span>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <button className="btn" onClick={handleDialogSubmit}>
            Send
          </button>

          <button className="btn btn-outline" onClick={handleClose}>
            Cancel
          </button>
        </dialog>
      )}
    </Wrapper>
  );
};
export default Request;
