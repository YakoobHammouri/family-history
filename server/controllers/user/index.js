const login = require('./login');
const profile = require('./profile');
const editprofile = require('./editprofile');
const signup = require('./signup');
const userEvent = require('./userEvent');

const checkUserEmail = require('./checkUserEmail');

const logout = require('./logout');

const changePassword = require('./changePassword');

module.exports = {
  login,
  profile,
  signup,
  userEvent,
  checkUserEmail,
  logout,
  editprofile,
  changePassword,
};
