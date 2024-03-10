const mongoose = require("mongoose");
const {
  JOB_TAGS,
  JOB_SCOPES,
  EXPERIENCE,
  RATES,
  LANGUAGES,
} = require("../utils/constants");

const EmployeeSchema = new mongoose.Schema(
  {
    employeeFullName: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    ratingsSum: {
      type: Number,
      default: 0,
    },
    // age: {
    //   type: Number,
    //   required: [true, "Age is required"],
    // },
    avatarUrl: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [1, "Description should be at least 1 characters long"],
      maxLength: [500, "Description cannot be longer than 500 characters"],
    },
    tags: {
      type: [
        {
          type: String,
          enum: {
            values: Object.values(JOB_TAGS),
            message: "{VALUE} - invalid tag value",
          },
        },
      ],
      required: [true, "Tags is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    latitude: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
    },
    scope: {
      type: String,
      required: [true, "Scope is required"],
      enum: {
        values: Object.values(JOB_SCOPES),
        message: "{VALUE} - invalid scope value",
      },
    },
    rate: {
      type: String,
      required: [true, "Rate is required"],
      enum: {
        values: RATES,
        message: "{VALUE} - invalid rate value",
      },
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      enum: {
        values: [...EXPERIENCE, "No experience"],
        message: "{VALUE} - invalid experience value",
      },
    },
    languages: {
      type: [
        {
          type: String,
          enum: {
            values: LANGUAGES,
            message: "{VALUE} - invalid language value",
          },
        },
      ],
      required: [true, "Languages is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
