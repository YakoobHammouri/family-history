const bcrypt = require('bcrypt');

const connection = require('../../connection');

module.exports = async (userId, newPassword) => {
  try {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const sql = {
      text: 'UPDATE USERS  SET password =$1  WHERE gid=$2',
      values: [passwordHash, userId],
    };
    return connection.query(sql.text, sql.values);
  } catch (error) {
    console.log('error in db : ', error);
    const postError = new Error('error in change password');
    throw postError;
  }
};
