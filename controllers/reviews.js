const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");
const Job = require("../models/Job");
const Employee = require("../models/Employee");
const models = { Job, Employee };

// Get all reviews
const getAllReviews = async (req, res) => {
  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ postId: req.params.postId })
    .skip(skip)
    .limit(limit);

  const totalReviews = await Review.countDocuments({
    postId: req.params.postId,
  });
  const numOfPages = Math.ceil(totalReviews / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalReviews, numOfPages, currentPage: page, reviews });
};

// Create new review
const createReview = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.postId = req.params.postId;

  const post = await models[req.model].findByIdAndUpdate(
    req.body.postId,
    {
      $inc: { ratingsSum: req.body.rating, totalRatings: 1 },
    },
    {
      new: true,
    }
  );

  post.rating = post.ratingsSum / post.totalRatings;

  await post.save();

  await Review.create({
    ...req.body,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Review added successfully" });
};

// Delete review
const deleteReview = async (req, res) => {
  const review = await Review.findByIdAndRemove(req.params.id);

  const post = await models[req.model].findByIdAndUpdate(
    review.postId,
    {
      $inc: { ratingsSum: -review.rating, totalRatings: -1 },
    },
    {
      new: true,
    }
  );

  post.rating =
    post.totalRatings !== 0 ? post.ratingsSum / post.totalRatings : 0;

  await post.save();

  res.status(StatusCodes.OK).json({ msg: "Review deleted successfully" });
};

module.exports = { getAllReviews, createReview, deleteReview };
