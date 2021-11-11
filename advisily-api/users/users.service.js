const config = require("config");
const frontendUrl = config.get("frontendUrl");
const hostUrl = config.get("hostUrl");

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

  const oldUser = await _getUserBy({
    email: user.email,
    userId: user.userId,
  });
  if (oldUser) throw "A user with this Student ID or email already registered.";

  const insertUserQuery = "INSERT INTO users SET ?";
  [data, err] = await query(insertUserQuery, [user]);
console.log("ERROR:",err);
  if (err)
	  throw "Error registering user.";

  sendVerificationEmail(user);
  const authToken = getAuthToken(user);

  return {
    ...basicInfo(user),
    authToken,
  };
}

async function login({ email, password }) {
	
	console.log("LOgging in");
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

  user = { ...user, ...params };
  const sql = "UPDATE users SET ? WHERE userId=? ";
  const [data, err] = await query(sql, [user, id]);
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

  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  const [, err] = await query(updateStudentQuery, [user, email]);
  if (err) return res.status(400).send(err);

  sendForgotPasswordEmail(user);
}

async function resetPassword({ token, password }) {
  let data, err;

  const user = await validateResetToken(token);
  user.password = await hash(password);
  user.passwordResetToken = null;
  user.resetTokenExpires = null;

  const updateStudentQuery = baseUpdateQuery + " WHERE email=?";
  [data, err] = await query(updateStudentQuery, [user, user.email]);
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
  sendVerificationEmail(user);
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
  if (err) throw "Error getting user.";
    
  console.log(data,getStudentQuery);
  return data.length ? data[0] : null;
}

function sendForgotPasswordEmail(user) {
  const verifyUrl = `${frontendUrl}/account/reset-password?token=${user.passwordResetToken}`;
  let msg = `<p>Please click <a href=${verifyUrl}>here<a/> to reset your password. This link will expire in 24 hours</p>`;

  sendEmail({
    to: user.email,
    subject: "Advisily -- Password Reset",
    html: `${msg}`,
  });
}

const sendVerificationEmail = (user) => {
  const verifyUrl = `${hostUrl}/api/users/verify-email?token=${user.verificationToken}`;
  let msg = `<p>Please click <a href=${verifyUrl}>here<a/> to verify your email address</p>`;
  console.log("Sending email to :", user);
  sendEmail({
    to: user.email,
    subject: "Advisily -- Email Verification",
    html: `<p>Almost done!.<p/><br/> 
          <p>${user.firstName}, you are one step away from meeting your new advisor.<p/>
    ${msg}`,
  });
};
