const { updateHistory } = require('../../database/query/history');

const {
  InternalErrorMessage,
  FailedMessage,
  successMessage,
} = require('../../helpers/responseMessage');

const { editHistoryValidation } = require('../../helpers/Validation');

module.exports = (req, res) => {
  console.log('Edit req.body :  ', req.body);
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

  const { error } = editHistoryValidation(data);

  if (error) {
    // return error message if not valid

    const errorMessage = error.toString().replace('ValidationError:', '');

    return res.status(400).json(FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  
  updateHistory(data)
    .then((result) => {
      console.log('result Edit :', result);
      return res
        .status(200)
        .json(successMessage(null, 'تم تحديث البيانات بنجاح'));
    })
    .catch((err) => {
      console.log('Error Edit : ', { ...err });
      res
        .status(501)
        .json(
          InternalErrorMessage(
            null,
            'لقد حدث خطا اثناء تحديث البيانات الرجاء المحاولة مرة اخرى',
          ),
        );
    });
};
