const { getAllUserEvent, getUserById } = require('./../../database/query/user');
const {
  InternalErrorMessage,
  UnauthorizedMessage,
  successMessage,
} = require('./../../helpers/responseMessage');

module.exports = async (req, res) => {
  const user = req.user;
  try {
    let userEvents = null;
    if (user !== 'admin') {
      userEvents = (await getAllUserEvent(user.gid)).rows;
    }
    /*
      if userinfo not found ,
      the user must be login again to continue  
    */
    if (!user) {
      return res
        .status(403)
        .clearCookie('AuthToken')
        .json(UnauthorizedMessage(null, 'please login to continue... '));
    }

    return res
      .status(200)
      .json(successMessage({ userInfo: user, userEvents }, 'user profile'));
  } catch (err) {
    console.log('Error in Get Profile : ', err);
    return res
      .status(200)
      .json(InternalErrorMessage(null, 'internal error in the server'));
  }
};
