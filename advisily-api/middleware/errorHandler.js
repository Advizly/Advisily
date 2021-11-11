module.exports = function errorHandler(err, req, res, next) {
  if (!err) return;
        console.log(err);

  switch (true) {
    case typeof err === "string":
      const validationError = res.statusCode === 422;
      const is404 = err.toLowerCase().endsWith("not found.");
      const statusCode = is404 ? 404 : 400;
      if (!validationError) res.status(statusCode);

      return res.json({ error: err });
    case typeof err === "object":
      if (err.statusCode && err.message) {
        const statusCode = err.statusCode ? err.statusCode : 400;
        const { message } = err;
        return res.status(statusCode).json({ error: message });
      }

    default:
      console.log(err);
      res.status(500).json({ error: "Unknown error" });
  }
};
