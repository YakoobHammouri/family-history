const { successMessage } = require('../../helpers/responseMessage');

// we the code Arrived here , then the Email is is Available
module.exports = (req, res) => {
  return res
    .status(200)
    .json(
      successMessage(
        { isAvailable: true },
        'This Email is not used in our system , you can continue in sign up',
      ),
    );
};
