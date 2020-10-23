const { deleteHistory } = require('../../database/query/history');
const {
  InternalErrorMessage,
  successMessage,
  FaildLoginMessage,
} = require('../../helpers/responseMessage');

const cloudinary = require('cloudinary').v2;
module.exports = async (req, res) => {
  const { id, imageId } = req.body;
  if (!id) {
    return res.status(501).json(InternalErrorMessage(null, 'the Id Null'));
  }

  try {
    try {
      cloudinary.uploader.destroy(imageId);
    } catch {}

    const deleteResult = await deleteHistory(id);
    if (deleteResult.rowCount === 0) {
      return res
        .status(404)
        .json(
          FaildLoginMessage(
            null,
            'البيانات المراد حذفها غير موجودة الرجاء اعادة تحميل الصفحة ثم حاول مجدداً',
          ),
        );
    }
    return res.status(200).json(successMessage());
  } catch (err) {
    console.log('Error in delete History : ', err);
    return res
      .status(501)
      .json(
        InternalErrorMessage(
          null,
          'عذرا لقد حدث خطا اثناء حذف البيانات الرجاء اعادة تحميل الصفحة ثم حاول مجدداً',
        ),
      );
  }
};
