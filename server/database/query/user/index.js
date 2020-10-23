

const getUserById = require('./getUserById');
const addUser = require('./addUser');
const getUserByEmail = require('./getUserByEmail');
const getAllUserByRole = require('./getAllUserByRole');
const changePassword = require('./changePassword');
const editUserInfo = require('./editUserInfo');
module.exports = {
  getUserById,

  addUser,
  getUserByEmail,
  getAllUserByRole,
  changePassword,
  editUserInfo,
};
