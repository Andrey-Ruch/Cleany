const mongoose = require("mongoose");

const EmploymentSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Sender id is required"],
    },
    recipientId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Recipient id is required"],
    },
    jobId: {
      type: mongoose.Schema.ObjectId,
      ref: "Job",
    },
    employeeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Employee",
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employment", EmploymentSchema);
