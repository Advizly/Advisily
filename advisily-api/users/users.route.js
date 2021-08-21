const express = require("express");
const router = express.Router();

/* Nested routes*/
router.use("/user_minors", require("../routes/user_minors"));
router.use("/user_majors", require("../routes/user_majors"));
router.use("/user_courses", require("../routes/user_courses"));

const controller = require("./users.controller");
const schemas = require("./users.schema");
const requestValidator = require("../middleware/requestValidator");

router.get("/", controller.getUsers);
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

router.post(
  "/resend-verification",
  requestValidator(schemas.resendVerification()),
  controller.resendVerification
);

router.get(
  "/user",
  requestValidator(schemas.getUser(), "query"),
  controller.getUser
);

module.exports = router;
