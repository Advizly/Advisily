const express = require("express");
const router = express.Router();

/* Nested routes*/
router.use("/user-minors", require("./userMinors/user-minors.route"));
router.use("/user-majors", require("./userMajors/user-majors.route"));
router.use("/user-courses", require("./userCourses/user-courses.route"));

const controller = require("./users.controller");
const schemas = require("./users.schema");
const requestValidator = require("../middleware/requestValidator");
const auth = require("../middleware/auth")

router.get("/",
  auth,
  controller.getUsers);
router.get(
  "/verify-email",
  auth,
  requestValidator(schemas.verifyEmail(), "query"),
  controller.verifyEmail
);
router.post(
  "/forgot-password",
  auth,
  requestValidator(schemas.forgotPassword()),
  controller.forgotPassword
);
router.post(
  "/reset-password",
  auth,
  requestValidator(schemas.resetPassword()),
  controller.resetPassword
);
router.post(
  "/validate-reset-token",
  auth,
  requestValidator(schemas.validateResetToken()),
  controller.validateResetToken
);

router.post(
  "/register",
  requestValidator(schemas.register()),
  controller.register
);

router.delete(
  '/:userId',
  auth,
  requestValidator(schemas.deleteUser(), "params"),
  controller.deleteUser
  )

router.post(
  "/resend-verification",
  auth,
  requestValidator(schemas.resendVerification()),
  controller.resendVerification
);

router.get(
  "/user",
  auth,
  requestValidator(schemas.getUser(), "query"),
  controller.getUser
);

router.post(
  "/login",
  requestValidator(schemas.loginSchema()),
  controller.login
);

router.put(
  "/:id",
  auth,
  [requestValidator(schemas.updateSchema())],
  controller.update
);

module.exports = router;
