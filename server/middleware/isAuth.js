require('dotenv').config();

const responseMessage = require('../helpers/responseMessage');

const { verify } = require('jsonwebtoken');

const { getUserById } = require('../database/query/user');

module.exports = (req, res, next) => {
  const token = !req.cookies ? null : req.cookies.AuthToken;

  if (!token) {
    return res
      .status(403)
      .json(
        responseMessage.UnauthorizedMessage(
          null,
          'please login to continue... ',
        ),
      );
  }

  verify(token, process.env.acces_Token_secret, (err, payload) => {
    if (err) {
      return res
        .status(403)
        .clearCookie('AuthToken')
        .json(
          responseMessage.UnauthorizedMessage(
            null,
            'please login to continue... ',
          ),
        );
    }

    getUserById(payload.id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res
            .status(403)
            .clearCookie('AuthToken')
            .json(
              responseMessage.UnauthorizedMessage(
                null,
                'please login to continue... ',
              ),
            );
        }

        req.user = result.rows[0];
        return next();
      })
      .catch((err) =>
        res
          .status(403)
          .clearCookie('AuthToken')
          .json(
            responseMessage.UnauthorizedMessage(
              null,
              'please login to continue... ',
            ),
          ),
      );
  });
};
