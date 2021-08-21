module.exports = function errorHandler(err, req, res, next) {
  if (!err) return;
  switch (true) {
    case typeof err === "string":
      const validationError = res.statusCode === 422;
      const is404 = err.toLowerCase().endsWith("not found.");
      const statusCode = is404 ? 404 : 400;
      if (!validationError) res.status(statusCode);

      return res.json({ error: err });

    default:
      console.log(err);
      res.status(500).json({ error: "Unknown error" });
  }
};
