const config = require("config");
const frontendUrl = config.get("frontendUrl");
const hostUrl = config.get("hostUrl");
console.log(frontendUrl, hostUrl);

const _ = require("lodash");
const bcrypt = require("bcrypt");

const sendEmail = require("../helpers/sendEmail");
const { query, parseConditions } = require("../helpers/mysql");
const {
  getAuthToken,
  getRandomToken,
  basicInfo,
  hash,
} = require("../helpers/account");
const promiseHandler = require("../helpers/promiseHandler");

module.exports = {
  getUsers,
  getUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  validateResetToken,
  register,
  login,
  resendVerification,
  update,
};

const baseGetUsersQuery = "SELECT * FROM users";
const baseUpdateQuery = "UPDATE users SET ?";

async function register(user) {
  user = _.omit(user, ["repeatPassword"]);
  user.password = await hash(user.password);
  user.isVerified = false;
  user.verificationToken = await getRandomToken();

  let oldUser = await _getUserBy({
    userId: user.userId,
  });
  if (oldUser) throw "A user with this Student ID  already registered.";

  oldUser = await _getUserBy({
    email: user.email,
  });
  if (oldUser) throw "A user with this Student email already registered.";

  const insertUserQuery = "INSERT INTO users SET ?";
  [data, err] = await query(insertUserQuery, [user]);
  if (err) throw "Error registering user.";

  [, err] = await sendVerificationEmail(user);
  if (err)
    throw "Error sending verification email. Try resending verification email from the login page.";
  const authToken = getAuthToken(user);

  return {
    ...basicInfo(user),
    authToken,
  };
}

async function login({ email, password }) {
  const user = await _getUserBy({ email });

  if (!user) throw "Email not found.";

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw "Invalid email and password combination.";
  if (!user.isVerified)
    throw { message: "Please verify your email first.", statusCode: 401 };

  return getAuthToken(user);
}

async function getUsers() {
  const sql =
    baseGetUsersQuery +
    " LEFT OUTER JOIN standings as s on s.standingId=users.standingId order by userId";
  const [users, err] = await query(sql);
  if (err) throw err;

  const resultUsers = [];
  for (let i = 0; i < users.length; i++) {
    const authToken = getAuthToken(users[i]);
    resultUsers.push({
      ...basicInfo(users[i]),
      authToken,
    });
  }
  return resultUsers;
}

async function getUser(conditions) {
  const user = await _getUserBy(conditions);
  if (!user) throw "User not found.";

  const authToken = getAuthToken(user);
  return {
    ...basicInfo(user),
    authToken,
  };
}

async function update(id, params) {
  let user = await _getUserBy({ userId: id });
  if (!user) throw "User of given ID not found.";

  const { email, userId } = params;

  if (email && email !== user.email && !!(await _getUserBy({ email })))
    throw "A user with this Student ID  already registered.";

  if (userId && userId !== user.userId && !!(await _getUserBy({ userId })))
    throw "A user with this Student ID  already registered.";

  if (params.password) params.password = await hash(params.password);

  const sql = "UPDATE users SET ? WHERE userId=? ";
  const [data, err] = await query(sql, [params, id]);
  if (err) throw "Error updating user";

  return data;
}

async function verifyEmail(token) {
  let data, err;

  const getUserQuery =
    baseGetUsersQuery + " WHERE verificationToken = ? LIMIT 1";
  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";

  [data, err] = await query(getUserQuery, token);
  if (err) throw err;
  console.log(getUserQuery);
  if (!data.length) throw "User not found.";

  const user = data[0];
  user.isVerified = true;
  user.verificationToken = null;

  [, err] = await query(updateStudentQuery, [user, user.email]);
  if (err) throw "Error verifying user.";
}

async function forgotPassword(email) {
  const user = await _getUserBy({ email });
  if (!user) throw "User of given email not found.";
  user.passwordResetToken = await getRandomToken();
  user.resetTokenExpires = new Date(Date.now() + 24 * 3600 * 1000); //expires in 24 hours
  const passwordData = _.pick(user, ["passwordResetToken", "resetTokenExpire"]);

  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  let [, err] = await query(updateStudentQuery, [passwordData, email]);
  if (err) throw { err, message: "Error resetting password." };

  [, err] = await sendForgotPasswordEmail(user); //);
  if (err) throw { err, message: "Error resetting password." };
}

async function resetPassword({ token, password }) {
  let data, err, user;

  [user, err] = await promiseHandler(validateResetToken(token));
  if (err) throw err;
  // console.log("USER: ", user,err);
  user = _.pick(user, ["email"]);
  user.password = await hash(password);
  user.passwordResetToken = null;
  user.resetTokenExpire = null;

  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  [data, err] = await query(updateStudentQuery, [user, user.email]);
  // console.log(err,data);
  if (err) throw "Error resetting password.";
}
async function resetPassword({ token, password }) {
  let data, err, user;

  [user, err] = await promiseHandler(validateResetToken(token));
  if (err) throw err;
  // console.log("USER: ", user,err);
  user = _.pick(user, ["email"]);
  user.password = await hash(password);
  user.passwordResetToken = null;
  user.resetTokenExpire = null;

  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  [data, err] = await query(updateStudentQuery, [user, user.email]);
  // console.log(err,data);
  if (err) throw "Error resetting password.";
}
async function validateResetToken(token) {
  const user = await _getUserBy({
    passwordResetToken: token,
  });
  if (!user) throw "Invalid reset token. User not found.";
  if (user.resetTokenExpires < Date.now()) throw "Reset token expired.";

  return user;
}

async function resendVerification(email) {
  const user = await _getUserBy({ email });
  if (!user) throw "User of given email not found.";

  if (user.isVerified) throw "User already verified.";
  let [, err] = await sendVerificationEmail(user);
  if (err) throw "Error sending verification email.";
}

//internal helper to get user by conditions.
//input: conditions object { userId?, firstName?,lastName?,email?}
//output: first user that matches all the conditions given.
async function _getUserBy(conditions) {
  const { columns, values } = parseConditions(conditions);
  if (!values.length) return null;
  let getStudentQuery =
    baseGetUsersQuery +
    " LEFT OUTER JOIN standings as s on s.standingId=users.standingId";
  getStudentQuery = getStudentQuery + ` WHERE ${columns} LIMIT 1`;

  const [data, err] = await query(getStudentQuery, values);
  console.log(err);
  if (err) throw "Error getting user.";

  return data.length ? data[0] : null;
}

async function sendForgotPasswordEmail(user) {
  const verifyUrl = `${frontendUrl}/account/reset-password?token=${user.passwordResetToken}`;
  let msg = `<p>Please click <a href=${verifyUrl}>here<a/> to reset your password. This link will expire in 24 hours</p>`;

  return promiseHandler(
    sendEmail({
      to: user.email,
      subject: "Advisily -- Password Reset",
      html: `${msg}`,
    })
  );
}

const sendVerificationEmail = (user) => {
  const verifyUrl = `${hostUrl}/users/verify-email?token=${user.verificationToken}`;
  let msg = `<p>Please click <a href=${verifyUrl}>here<a/> to verify your email address</p>`;
  // console.log("Sending email to :", user);
  return promiseHandler(
    sendEmail({
      to: user.email,
      subject: "Advisily -- Email Verification",
      html: `<p>Almost done!.<p/><br/> 
          <p>${user.firstName}, you are one step away from meeting your new advisor.<p/>
    ${msg}`,
    })
  );
};
