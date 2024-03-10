const filters = (req, role) => {
  const { search, tags, languages, scope, experience, rate, city, sort } =
    req.query;

  const queryObject = {};

  if (req.user.role === role) {
    queryObject.createdBy = req.user.userId;
  }

  const tagsList = tags?.trim().split(/\s*,\s*/);
  const languagesList = languages?.trim().split(/\s*,\s*/);

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (tags) {
    queryObject.tags = { $all: tagsList };
  }

  if (languages) {
    queryObject.languages = { $all: languagesList };
  }

  if (scope) {
    queryObject.scope = { $eq: scope };
  }

  if (experience) {
    queryObject.experience = { $eq: experience };
  }

  if (rate) {
    queryObject.rate = { $eq: rate };
  }

  if (city) {
    queryObject.address = { $regex: city, $options: "i" };
  }

  const sortOptions = {
    Popular: "-rating",
    Newest: "-createdAt",
    Oldest: "createdAt",
    "a-z": "title",
    "z-a": "-title",
  };

  const sortKey = sortOptions[sort] || sortOptions.Newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  return { queryObject, sortKey, page, limit, skip };
};

module.exports = { filters };
