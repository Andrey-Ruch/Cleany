const { body, param, query, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const Employee = require("../models/Employee");
const Job = require("../models/Job");
const User = require("../models/User");
const Review = require("../models/Review");
const Employment = require("../models/Employment");
const {
  JOB_TAGS,
  JOB_SCOPES,
  EXPERIENCE,
  RATES,
  LANGUAGES,
} = require("../utils/constants");

const coreValidationsErrors = [
  body("description").notEmpty().withMessage("Description is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("latitude").notEmpty().withMessage("Latitude is required"),
  body("longitude").notEmpty().withMessage("Longitude is required"),
  body("rate")
    .notEmpty()
    .withMessage("Rate is required")
    .isIn(RATES)
    .withMessage("Invalid rate value"),
  body("scope")
    .notEmpty()
    .withMessage("Scope is required")
    .isIn(Object.values(JOB_SCOPES))
    .withMessage("Invalid scope value"),
  body("languages")
    .notEmpty()
    .withMessage("Languages is required")
    .isIn(LANGUAGES)
    .withMessage("Invalid language value")
    .custom(async (languages) => {
      if (languages instanceof Array) {
        const uniqueValues = new Set(languages);

        if (uniqueValues.size !== languages.length) {
          throw new BadRequestError("Duplicate languages");
        }
      }
    }),
  body("tags")
    .notEmpty()
    .withMessage("Tags is required")
    .isIn(Object.values(JOB_TAGS))
    .withMessage("Invalid tag value")
    .custom(async (tags) => {
      if (tags instanceof Array) {
        const uniqueValues = new Set(tags);

        if (uniqueValues.size !== tags.length) {
          throw new BadRequestError("Duplicate tags");
        }
      }
    }),
];

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (
          errorMessages[0].startsWith("No job") ||
          errorMessages[0].startsWith("No employee")
        ) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthenticatedError("Not authorized to access this route");
        }

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

const validMongoId = (id, ref = "") => {
  const isValidMongoId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidMongoId) throw new BadRequestError(`Invalid ${ref} id`);
};

const isAuthorized = (id, role, modelObj) => {
  const isAdmin = role === "Admin";
  const isOwner = id === modelObj.createdBy.toString();

  if (!isAdmin && !isOwner)
    throw new UnauthenticatedError("Not authorized to access this route");
};

const validateRegisterInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

const validateUpdateUserInput = withValidationErrors([
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });

      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already exists");
      }
    }),
]);

const validateEmployeeId = withValidationErrors([
  param("id").custom(async (value, { req: { user } }) => {
    validMongoId(value, "employee");

    const employee = await Employee.findById(value);

    if (!employee) throw new NotFoundError(`No employee with id ${value}`);

    // isAuthorized(user.userId, user.role, employee);
  }),
]);

const validateJobId = withValidationErrors([
  param("id").custom(async (value, { req: { user } }) => {
    validMongoId(value, "job");

    const job = await Job.findById(value);

    if (!job) throw new NotFoundError(`No job with id ${value}`);

    // isAuthorized(user.userId, user.role, job);
  }),
]);

const validateUserId = withValidationErrors([
  param("id").custom(async (value) => {
    validMongoId(value, "user");

    const user = await User.findById(value);

    if (!user) throw new NotFoundError(`No user with id ${value}`);

    // isAuthorized(user.userId, user.role, employee);
  }),
]);

const validatePostId = withValidationErrors([
  param("postId").custom(async (value, { req }) => {
    validMongoId(value);

    const job = await Job.findById(value);
    const employee = await Employee.findById(value);

    if (!job && !employee)
      throw new NotFoundError(`No reviews for post with id ${value}`);

    if (job && req.user.role === "Employer")
      throw new UnauthenticatedError("Employer cannot write a employee review");

    if (employee && req.user.role === "Employee")
      throw new UnauthenticatedError("Employee cannot write a job review");

    req.model = job ? "Job" : "Employee";
  }),
]);

const validateReviewId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    validMongoId(value, "review");

    const review = await Review.findById(value);

    if (!review) throw new NotFoundError(`No review with id ${value}`);

    const job = await Job.findById(review.postId);

    req.model = job ? "Job" : "Employee";

    // isAuthorized(user.userId, user.role, job);
  }),
]);

const validateJobInput = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required"),
  body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .isIn([...EXPERIENCE, "Doesn't matter"])
    .withMessage("Invalid experience value"),
  ...coreValidationsErrors,
]);

const validateEmployeeInput = withValidationErrors([
  body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .isIn([...EXPERIENCE, "No experience"])
    .withMessage("Invalid experience value"),
  ...coreValidationsErrors,
]);

const validateReviewInput = withValidationErrors([
  body("rating").notEmpty().withMessage("Rating is required"),
  body("comment").notEmpty().withMessage("Comment is required"),
]);

const validateEmploymentInput = withValidationErrors([
  body("senderId")
    .notEmpty()
    .withMessage("Sender id is required")
    .custom(async (senderId) => {
      validMongoId(senderId, "sender");

      const user = await User.findById(senderId);

      if (!user) throw new NotFoundError(`No sender with id ${senderId}`);
    }),
  body("recipientId")
    .notEmpty()
    .withMessage("Recipient id is required")
    .custom(async (recipientId) => {
      validMongoId(recipientId, "recipient");

      const user = await User.findById(recipientId);

      if (!user) throw new NotFoundError(`No sender with id ${recipientId}`);
    }),

  body("jobsIds")
    .notEmpty()
    .withMessage("Jobs ids is required")
    .isArray()
    .withMessage("Jobs ids should be an array")
    .custom(async (jobsIds) => {
      const isAllIdsValid = await Promise.all(
        jobsIds.map(async (jobId) => {
          const isValidMongoId = mongoose.Types.ObjectId.isValid(jobId);
          if (!isValidMongoId) return false;

          const job = await Job.findById({ _id: jobId });
          if (!job) return false;

          return true;
        })
      );

      if (isAllIdsValid.includes(false))
        throw new BadRequestError(
          `No job with id ${jobsIds[isAllIdsValid.indexOf(false)]}`
        );
    }),
  body("employeeId")
    .notEmpty()
    .withMessage("Employee id is required")
    .custom(async (employeeId) => {
      validMongoId(employeeId, "employee");

      const employee = await Employee.findById(employeeId);

      if (!employee)
        throw new NotFoundError(`No employee with id ${employeeId}`);
    }),
]);

const validateEmploymentQuery = withValidationErrors([
  query("postId").notEmpty().withMessage("Post id is required"),
]);

const validateEmploymentId = withValidationErrors([
  param("id").custom(async (value) => {
    validMongoId(value, "employment");

    const employment = await Employment.findById(value);

    if (!employment) throw new NotFoundError(`No employment with id ${value}`);
  }),
]);

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput,
  validateJobId,
  validateJobInput,
  validateEmployeeId,
  validateEmployeeInput,
  validateUserId,
  validatePostId,
  validateReviewId,
  validateReviewInput,
  validateEmploymentInput,
  validateEmploymentQuery,
  validateEmploymentId,
};
