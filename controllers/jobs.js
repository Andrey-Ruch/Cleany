const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Job = require("../models/Job");
const Review = require("../models/Review");
const Employment = require("../models/Employment");
const cloudinary = require("cloudinary").v2;
const { formatImage } = require("../middleware/multerMiddleware");
const { filters } = require("../utils/filters");

// Get all jobs
const getAllJobs = async (req, res) => {
  const { queryObject, sortKey, page, limit, skip } = filters(req, "Employer");

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

// Get job by id
const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

// Create new job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.isManned = false;

  const jobs = await Job.find({ createdBy: req.user.userId });

  console.log(jobs.length);

  if (jobs.length === 5) {
    throw new BadRequestError("Cannot add more than 5 works");
  }

  const newJob = { ...req.body };

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);

    newJob.image = {
      url: response.secure_url,
      publicId: response.public_id,
    };
  }

  await Job.create(newJob);

  res.status(StatusCodes.CREATED).json({ msg: "Job added successfully" });
};

// Update job
const updateJob = async (req, res) => {
  const newJob = { ...req.body };

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);

    newJob.image = {
      url: response.secure_url,
      publicId: response.public_id,
    };
  }

  const oldJob = await Job.findById(req.params.id);

  await Job.findByIdAndUpdate(req.params.id, newJob, {
    new: true,
  });

  if (req.file && oldJob.image.publicId) {
    await cloudinary.uploader.destroy(oldJob.image.publicId);
  }

  res.status(StatusCodes.OK).json({ msg: "Job edited successfully" });
};

// Delete job
const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndRemove(req.params.id);
  await Review.deleteMany({ postId: req.params.id });
  await Employment.deleteMany({ jobId: req.params.id });

  if (removedJob.image.publicId) {
    await cloudinary.uploader.destroy(removedJob.image.publicId);
  }

  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
