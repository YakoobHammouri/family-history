const getUserEventById = require('./getUserEventbyId');
const getAllUserEvent = require('./getAllUserEvent');
const getUserById = require('./getUserById');
const addUser = require('./addUser');
const getUserByEmail = require('./getUserByEmail');
const getAllUserByRole = require('./getAllUserByRole');
const changePassword = require('./changePassword');
const editUserInfo = require('./editUserInfo');
module.exports = {
  getUserById,
  getAllUserEvent,
  getUserEventById,
  addUser,
  getUserByEmail,
  getAllUserByRole,
  changePassword,
  editUserInfo,
};
