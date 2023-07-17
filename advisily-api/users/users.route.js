const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
/* Nested routes*/
router.use("/user-minors", require("./userMinors/user-minors.route"));
router.use("/user-majors", require("./userMajors/user-majors.route"));
router.use("/user-courses", require("./userCourses/user-courses.route"));

const controller = require("./users.controller");
const schemas = require("./users.schema");
const requestValidator = require("../middleware/requestValidator");
const verifyJwt = require("../middleware/verifyJwt");



router.get("/", verifyJwt, controller.getUsers);
router.get(
  "/verify-email",
  requestValidator(schemas.verifyEmail(), "query"),
  controller.verifyEmail
);
router.post(
  "/forgot-password",
  requestValidator(schemas.forgotPassword()),
  controller.forgotPassword
);
router.post(
  "/reset-password",
  requestValidator(schemas.resetPassword()),
  controller.resetPassword
);
router.post(
  "/validate-reset-token",
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
  requestValidator(schemas.deleteUser(), "params"),
  verifyJwt,
  controller.deleteUser
  )

router.post(
  "/resend-verification",
  requestValidator(schemas.resendVerification()),
  controller.resendVerification
);

router.get(
  "/user",
  requestValidator(schemas.getUser(), "query"),
  verifyJwt,
  controller.getUser
);

router.post(
  "/login",
  requestValidator(schemas.loginSchema()),
  controller.login
);




router.put(
  "/:id",
  [requestValidator(schemas.updateSchema()), verifyJwt],
  controller.update
);

module.exports = router;
