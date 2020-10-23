require('dotenv').config();

const jwt = require('jsonwebtoken');

const {
  InternalErrorMessage,
  successMessage,
  FailedMessage,
} = require('../../helpers/responseMessage');

const { changePasswordValidation } = require('../../helpers/Validation');

const { changePassword } = require('../../database/query/user');

module.exports = (req, res) => {
  const data = !req.body ? null : req.body;
  if (!data) {
    return res
      .status(501)
      .json(
        InternalErrorMessage(
          null,
          'لقد حدث خطا اثناء اضافة البيانات الرجاء المحاولة مرة اخرى',
        ),
      );
  }

  const { error } = changePasswordValidation(data);
  if (error) {
    // return error message if not valid
    const errorMessage = error.toString().includes('[ref:password]')
      ? 'the password not match , please re-Enter password'
      : error.toString().replace('ValidationError:', '');

    return res.status(400).json(FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  changePassword(req.user.gid, data.newPass)
    .then((result) => {
      console.log('reusk : ', result);
      const auth = jwt.sign(
        { id: req.user.gid },
        process.env.acces_Token_secret,
      );
      res.cookie('AuthToken', auth);
      return res
        .status(200)
        .json(successMessage(null, 'تم تحديث كلمة المرور بنجاح'));
    })
    .catch((err) => {
      console.log('error in controlleer : ', err);
      return res
        .status(501)
        .json(
          InternalErrorMessage(
            null,
            'لقد حدث خطا اثناء اضافة البيانات الرجاء المحاولة مرة اخرى',
          ),
        );
    });
};
