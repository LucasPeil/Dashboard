function filter(arrSearch) {
  return (req) => {
    const and = [];

    if (req.query.filter) {
      and.push({
        $or: arrSearch.map((key) => ({
          [key]: { $regex: req.query.filter, $options: "i" },
        })),
      });
    }

    if (req.query.categorySelected) {
      and.push({
        categoria: { $regex: req.query.categorySelected, $options: "i" },
      });
    }

    return and.length > 0 ? { $and: and } : {};
  };
}
module.exports = filter;
