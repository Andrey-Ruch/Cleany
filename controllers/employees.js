const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Employee = require("../models/Employee");
const User = require("../models/User");
const Review = require("../models/Review");
const Employment = require("../models/Employment");
const { filters } = require("../utils/filters");

// Get all employees
const getAllEmployees = async (req, res) => {
  const { queryObject, sortKey, page, limit, skip } = filters(req, "Employee");

  const employees = await Employee.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalEmployees = await Employee.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalEmployees / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalEmployees, numOfPages, currentPage: page, employees });
};

// Get employee by id
const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  res.status(StatusCodes.OK).json({ employee });
};

// Create new employee
const createEmployee = async (req, res) => {
  const { userId } = req.user;

  const employee = await Employee.findOne({ createdBy: userId });

  if (employee) {
    throw new BadRequestError("Employee already exists");
  }

  const user = await User.findById(userId);

  req.body.employeeFullName = `${user.firstName} ${user.lastName}`;
  req.body.createdBy = userId;
  req.body.avatarUrl = user?.avatar?.url || "";

  await Employee.create({
    ...req.body,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Employee added successfully" });
};

// Update employee
const updateEmployee = async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "Employee edited successfully" });
};

// Delete employee
const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndRemove(req.params.id);
  await Review.deleteMany({ postId: req.params.id });
  await Employment.deleteMany({ jobId: req.params.id });

  res.status(StatusCodes.OK).json({ msg: "Employee deleted successfully" });
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
