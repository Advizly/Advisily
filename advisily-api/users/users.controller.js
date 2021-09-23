const usersService = require("./users.service");
const _ = require("lodash");

const frontendUrl = require("config").get("frontendUrl");

module.exports = {
  getUsers,
  getUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  validateResetToken,
  register,
  resendVerification,
  login,
  update,
};

function register(req, res, next) {
  usersService
    .register(req.body)
    .then(({ authToken, ...user }) =>
      res
        .header("x-auth-token", authToken)
        .header("access-control-expose-headers", "x-auth-token")
        .json({ message: "User registered successfuly. You can login.", user })
    )
    .catch(next);
}

function getUsers(req, res, next) {
  usersService
    .getUsers()
    .then((users) => res.send(users))
    .catch(next);
}

function verifyEmail(req, res, next) {
  const { token } = req.body;

  usersService
    .verifyEmail(token)
    .then(() => res.status(200).redirect(`${frontendUrl}/account/login`))
    .catch(next);
}

function forgotPassword(req, res, next) {
  const { email } = req.body;

  usersService
    .forgotPassword(email)
    .then(() =>
      res.status(200).json({
        message:
          "We sent you email with the instructions to reset your password.",
      })
    )
    .catch(next);
}

function validateResetToken(req, res, next) {
  const { token } = req.body;

  usersService
    .validateResetToken(token)
    .then(() => res.json({ message: "Valid reset token" }))
    .catch(next);
}

function resetPassword(req, res, next) {
  const { token, password } = req.body;

  usersService
    .resetPassword({ token, password })
    .then(() =>
      res.json({
        message: "Password was reset successfuly. You can now login.",
      })
    )
    .catch(next);
}

function resendVerification(req, res, next) {
  const { email } = req.body;

  usersService
    .resendVerification(email)
    .then(() => {
      res.send("Verification Email sent successfuly.");
    })
    .catch(next);
}

function getUser(req, res, next) {
  usersService
    .getUser(req.body)
    .then(({ authToken, ...userInfo }) => {
      res
        .header("x-auth-token", authToken)
        .header("access-control-expose-headers", "x-auth-token")
        .json(userInfo);
    })
    .catch(next);
}

function login(req, res, next) {
  usersService
    .login(req.body)
    .then((token) => {
      res.send(token);
    })
    .catch(next);
}

function update(req, res, next) {
  usersService
    .update(req.params.id, req.body)
    .then((result) => res.send(result))
    .catch(next);
}
