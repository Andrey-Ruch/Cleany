const { UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

//Register
const register = async (req, res) => {
  await User.create({
    ...req.body,
  });

  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Email not found");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password doesn't match");
  }

  const token = user.createJWT();
  const oneDay = 1000 * 60 * 60 * 24; // 1ms * 1s * 1h * 24h = 1d in ms

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "Successfully logged in" });
};

// Logout
const logout = async (req, res) => {
  res.cookie("token", "Logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Successfully logged out" });
};

module.exports = { register, login, logout };
