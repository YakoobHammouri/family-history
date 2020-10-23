const { getAll } = require('./../../database/query/history');
const {
  InternalErrorMessage,
  successMessage,
} = require('./../../helpers/responseMessage');

module.exports = async (req, res) => {
  try {
    const allHistory = (await getAll()).rows;
    return res.status(200).json(successMessage({ allHistory }));
  } catch (err) {
    console.log('Error in Get All History : ', err);
    return res
      .status(501)
      .json(InternalErrorMessage(null, 'internal error in the server'));
  }
};
