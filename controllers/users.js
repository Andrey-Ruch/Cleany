const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Job = require("../models/Job");
const Employee = require("../models/Employee");
const cloudinary = require("cloudinary").v2;
const { formatImage } = require("../middleware/multerMiddleware");

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);

    await Employee.updateOne(
      { createdBy: req.user.userId },
      { $set: { avatarUrl: response.secure_url } }
    );

    newUser.avatar = {
      url: response.secure_url,
      publicId: response.public_id,
    };
  }

  await Employee.updateOne(
    { createdBy: req.user.userId },
    { $set: { employeeFullName: `${newUser.firstName} ${newUser.lastName}` } }
  );

  const oldUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && oldUser.avatar.publicId) {
    await cloudinary.uploader.destroy(oldUser.avatar.publicId);
  }

  res.status(StatusCodes.OK).json({ msg: "Successfully updated" });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      "Invalid Credentials - old password doesn't match"
    );
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Password updated" });
};

const getAppStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  const employees = await Employee.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs, employees });
};

module.exports = {
  getCurrentUser,
  getUser,
  updateUser,
  updateUserPassword,
  getAppStats,
};
