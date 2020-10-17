const bcrypt = require('bcrypt');

const connection = require('../../connection');

const { ROLE } = require('../../../helpers/Constants');

module.exports = async (userDetails, gid) => {
  const { name, phone, email, password, birthDate } = userDetails;
  const role = !userDetails.role ? ROLE.USER : userDetails.role;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const sql = {
      text:
        'INSERT INTO USERS  (gid, user_name, phone, birth_date, email, university, address, role, profession, password) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)',
      values: [
        gid,
        name,
        phone,
        birthDate,
        email.toLowerCase(),
        'Unknown',
        'Unknown',
        role,
        'Unknown',
        passwordHash,
      ],
    };
    return connection.query(sql.text, sql.values);
  } catch (error) {
    console.log('Error in add user : ', error);
    //throw new Error('Error in Add user');
    throw new Error('Error in Add user');
  }
};
