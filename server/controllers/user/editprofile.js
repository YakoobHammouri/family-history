const { editUserInfo } = require('../../database/query/user');

// require('dotenv').config();

// const jwt = require('jsonwebtoken');

const {
  InternalErrorMessage,
  FailedMessage,
  successMessage,
} = require('../../helpers/responseMessage');

const { updateProfileValidation } = require('../../helpers/Validation');

const editprofile = (req, res) => {
  const data = !req.body ? null : req.body;

  if (!data) {
    return res
      .status(501)
      .json(
        InternalErrorMessage(
          null,
          'Sorry Some Error Happened at registration please try again later',
        ),
      );
  }

  const { error } = updateProfileValidation(data);

  if (error) {
    // return error message if not valid

    const errorMessage = error.toString().includes('[ref:password]')
      ? 'the password not match , please re-Enter password'
      : error.toString().replace('ValidationError:', '');

    return res.status(400).json(FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  editUserInfo(data, req.user.gid)
    .then((result) => {
      return res
        .status(200)
        .json(successMessage(null, ' You updated you info successfully'));
    })
    .catch((err) => {
      res.status(501).json(InternalErrorMessage(null, 'internal error'));
    });
};
module.exports = editprofile;
