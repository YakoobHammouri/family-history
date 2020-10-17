const { getUserById } = require('../database/query/user');
const bcrypt = require('bcrypt');
const {
  FailedMessage,
  InternalErrorMessage,
} = require('../helpers/responseMessage');

module.exports = async (req, res, next) => {
  const { currentPass, newPass } = req.body;

  try {
    const match = await bcrypt.compare(currentPass, req.user.password);
    if (match) {
      // the Current must not equal the new passwprd
      if (currentPass === newPass) {
        return res
          .status(400)
          .json(
            FailedMessage(
              '',
              'the new Password should not be equal Current Password',
            ),
          );
      }

      // the current password correct
      return next();
    }

    return res
      .status(400)
      .json(FailedMessage('', 'the Current Password not Valid'));
  } catch (err) {
    return res
      .status(501)
      .json(InternalErrorMessage('', 'Some Error happened at check password '));
  }
};
