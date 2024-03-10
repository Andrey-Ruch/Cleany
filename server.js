// express
require("express-async-errors");

// env
require("dotenv").config();

const express = require("express");
const app = express();

// morgan
const morgan = require("morgan");

// extra and security packages
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const xss = require("xss-clean");

// models
const User = require("./models/User");

// routers
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const jobsRouter = require("./routes/jobs");
const employeesRouter = require("./routes/employees");
const reviewsRouter = require("./routes/reviews");
const employmentsRouter = require("./routes/employments");

// public
const path = require("path");

// auth
const { authenticateUser } = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middlewares
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'", "https:"],
        "img-src": ["'self'", "https: data: blob:"],
        "script-src": ["'self'", "https: blob:"],
      },
    },
  })
);
app.use(mongoSanitize());
app.use(cors());
app.use(xss());

// data base
const connectDB = require("./db/connect");

// routes
app.get("/", (req, res) => {
  res.status(200).json({ api: "cleany" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/employees", authenticateUser, employeesRouter);
app.use("/api/v1/reviews", authenticateUser, reviewsRouter);
app.use("/api/v1/employments", authenticateUser, employmentsRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;

// start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
