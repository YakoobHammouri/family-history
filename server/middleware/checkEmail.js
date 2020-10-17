const { getUserByEmail } = require('../database/query/user');
const {
  FailedMessage,
  InternalErrorMessage,
} = require('../helpers/responseMessage');

module.exports = (req, res, next) => {
  const { email } = req.params;
  console.log(email);
  getUserByEmail(email)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res
          .status(400)
          .json(
            FailedMessage(
              { isAvailable: false },
              'This Email is already used in our system',
            ),
          );
      }

      return next();
    })
    .catch((err) => {
      console.log('Errror in Check Email : ', { ...err });
      return res
        .status(200)
        .json(
          InternalErrorMessage(
            { isAvailable: false },
            'internal error with the server',
          ),
        );
    });
};
