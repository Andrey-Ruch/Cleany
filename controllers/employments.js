const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Job = require("../models/Job");
const Employee = require("../models/Employee");
const Employment = require("../models/Employment");

// Get all user employments
const getAllUserEmployments = async (req, res) => {
  const queryObject = {
    $or: [{ recipientId: req.user.userId }, { senderId: req.user.userId }],
  };

  const employments = await Employment.find(queryObject);

  res.status(StatusCodes.OK).json({ employments });
};

// Get Sender employments
const getSenderEmployments = async (req, res) => {
  const { userId, role } = req.user;
  const { postId } = req.query;
  const isEmployer = role === "Employer";

  const userPosts = isEmployer
    ? await Job.find({ createdBy: userId })
    : await Employee.find({ createdBy: userId });

  const queryObject = {
    $or: [{ recipientId: req.user.userId }, { senderId: req.user.userId }],
  };

  if (isEmployer) {
    queryObject.jobId = { $in: userPosts.map((userPost) => userPost._id) };
    queryObject.employeeId = postId;
  } else {
    queryObject.employeeId = {
      $in: userPosts.map((userPost) => userPost._id),
    };
    queryObject.jobId = postId;
  }

  const employments = await Employment.find(queryObject);

  // The user has not created a job or employee
  const isDisabled = userPosts.length === 0;

  // Requested employment exist
  const isRequested = employments.some(
    (employment) =>
      employment.state === "request" &&
      employment.senderId.toString() === userId
  );

  // Pending employment exist
  const isPending = employments.some(
    (employment) =>
      employment.state === "request" &&
      employment.recipientId.toString() === userId
  );

  const isApproved =
    !isDisabled &&
    userPosts.length === employments.length &&
    employments.every((employment) => employment.state === "approve");

  const isEnabled = !isDisabled && !isRequested && !isPending && !isApproved;

  const idType = isEmployer ? "jobId" : "employeeId";
  const employmentsPostsIds = employments.map((employment) =>
    employment[idType].toString()
  );

  // Free posts for employment
  const notEmployed = isEnabled
    ? userPosts.filter((userPost) => {
        return !employmentsPostsIds.includes(userPost._id.toString());
      })
    : [];

  res.status(StatusCodes.OK).json({
    isDisabled,
    isRequested,
    isEnabled,
    isPending,
    isApproved,
    notEmployed,
  });
};

// Create new employment
const createEmployments = async (req, res) => {
  const jobsIds = req.body.jobsIds;
  delete req.body.jobsIds;
  req.body.state = "request";

  jobsIds.forEach(async (jobId) => {
    await Employment.create({
      ...req.body,
      jobId,
    });
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Employment added successfully" });
};

// Update employment
const updateEmployment = async (req, res) => {
  req.body.state = "approve";
  const updatedEmployment = await Employment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  await Job.findByIdAndUpdate(
    updatedEmployment.jobId,
    { isManned: true },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Employment edited successfully" });
};

// Delete employment
const deleteEmployment = async (req, res) => {
  await Employment.findByIdAndRemove(req.params.id);

  res.status(StatusCodes.OK).json({ msg: "Employment deleted successfully" });
};

module.exports = {
  getAllUserEmployments,
  createEmployments,
  getSenderEmployments,
  updateEmployment,
  deleteEmployment,
};
