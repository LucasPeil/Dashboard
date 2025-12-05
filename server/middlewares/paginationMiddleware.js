const paginationHandler = (model, filter) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
    const prop = req.query.prop ? req.query.prop : "_id";
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let filter_ = {};
    if (typeof filter === "function") {
      filter_ = filter(req);
    } else {
      filter_ = filter;
    }

    const results = {
      total: await model.countDocuments(filter_).exec(),
    };

    if (endIndex < results.total) {
      results.next = { page: page + 1, limit: limit };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.documents = await model
        .aggregate([
          {
            $match: filter_,
          },
          { $sort: { [prop]: sortDirection } },
          { $skip: startIndex },
          { $limit: limit },
        ])
        .collation({ locale: "pt", caseLevel: true, strength: 3 });

      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = paginationHandler;
