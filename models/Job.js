const mongoose = require("mongoose");
const {
  JOB_TAGS,
  JOB_SCOPES,
  EXPERIENCE,
  RATES,
  LANGUAGES,
} = require("../utils/constants");

const JobSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String },
      publicId: { type: String },
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
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [1, "Title should be at least 1 characters long"],
      maxLength: [50, "Title cannot be longer than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [1, "Description should be at least 1 characters long"],
      maxLength: [500, "Description cannot be longer than 500 characters"],
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
        values: [...EXPERIENCE, "Doesn't matter"],
        message: "{VALUE} - invalid experience value",
      },
    },
    scope: {
      type: String,
      required: [true, "Scope is required"],
      enum: {
        values: Object.values(JOB_SCOPES),
        message: "{VALUE} - invalid scope value",
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isManned: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
