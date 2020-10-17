const { UnauthorizedMessage } = require('../helpers/responseMessage');

module.exports = (role) => (req, res, next) => {
  const user = !req.user ? null : req.user;

  const roleAccess = !req.body.role ? role : req.body.role;

  if (!user) {
    return res
      .status(403)
      .clearCookie('AuthToken')
      .json(UnauthorizedMessage(null, 'please login to continue... '));
  }

  if (user.role !== roleAccess) {
    return res.status(403).json(UnauthorizedMessage(null, 'Access Denied ...'));
  }

  // user Have permissions to access
  next();
};
