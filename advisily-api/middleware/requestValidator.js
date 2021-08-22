module.exports = function validate(
  schema,
  property = "body",
  extraOptions = {}
) {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      ...extraOptions,
    };
    const { error, value } = schema.validate(req[property], options);
    if (!error) {
      req.body = value;

      return next();
    }
    const { details } = error;
    const message = details.map((d) => d.message).join(", ");

    res.status(422);
    return next(`Validation error: ${message}`);
  };
};
