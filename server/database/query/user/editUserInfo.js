// UPDATE Customers
// SET ContactName='Juan';

const connection = require('../../connection');
const { EVENTSTATUS } = require('../../../helpers/Constants');

const editUserInfo = (userProfile, userID) => {
  const {
    user_name,
    phone,
    email,
    birth_date,
    university,
    profession,
    address,
  } = userProfile;

  const sql = {
    text:
      'UPDATE users set user_name=$1, phone=$2, email=$3, birth_date=$4, university=$5,  profession=$6,  address=$7 where gid=$8',
    values: [
      user_name,
      phone,
      email,
      birth_date,
      university,
      profession,
      address,
      userID,
    ],
  };

  return connection.query(sql.text, sql.values);
};
module.exports = editUserInfo;

// text:
//       'UPDATE users  (user_name, phone, email, birth_date, university,  profession,  address,) SET ($1, $2, $3, $4,$5,$6,$7)',
//     values: [name, phone, email, birthDate, university, profession, address],
