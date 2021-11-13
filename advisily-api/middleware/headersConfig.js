module.exports = function headersConfig(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  res.header("Access-Control-Request-Headers", "*");
  next();
};
