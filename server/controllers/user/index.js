
const login = require('./login');

const profile = require('./profile');
const editprofile = require('./editprofile');
const signup = require('./signup');

const checkUserEmail = require('./checkUserEmail');

const logout = require('./logout');

const changePassword = require('./changePassword');

module.exports = {
  login,
  profile,
  signup,
  checkUserEmail,
  logout,
  editprofile,
  changePassword,
};
