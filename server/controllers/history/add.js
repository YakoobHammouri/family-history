const { add } = require('../../database/query/history');

const responsemessage = require('../../helpers/responseMessage');

const { newHistoryValidation } = require('../../helpers/Validation');

const addHistory = (req, res) => {
  const historyData = req.body;
  console.log(historyData);
  const { error } = newHistoryValidation(historyData);

  if (error !== undefined) {
    // return error message if not valid
    const errorMessage = error.toString().replace('ValidationError:', '');
    return res
      .status(400)
      .json(responsemessage.FailedMessage(null, `Oops ! ${errorMessage}`));
  }

  add(historyData)
    .then((data) => {
      console.log('data : ', data);
      if (data.rowCount === 0) {
        return res
          .status(404)
          .json(
            responsemessage.FaildLoginMessage(
              null,
              'لقد حدث خطا اثناء اضافة البيانات الرجاء المحاولة مرة اخرى',
            ),
          );
      }

      return res
        .status(200)
        .json(
          responsemessage.successMessage(null, 'لقد تم اضافة البيانات بنجاح'),
        );
    })
    .catch((err) => {
      console.log('err : ', err);
      res
        .status(501)
        .json(
          responsemessage.InternalErrorMessage(
            null,
            'لقد حدث خطا اثناء اضافة البيانات الرجاء المحاولة مرة اخرى',
          ),
        );
    });
};
module.exports = addHistory;
