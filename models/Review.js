const mongoose = require("mongoose");
const { RATINGS } = require("../utils/constants");

const ReviewSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true, "Post id is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      enum: {
        values: RATINGS,
        message: "{VALUE} - invalid rating value",
      },
      required: [true, "Rating is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
