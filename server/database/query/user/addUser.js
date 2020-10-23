const bcrypt = require('bcrypt');

const connection = require('../../connection');

module.exports = async (userDetails) => {
  const { name, phone, email, password } = userDetails;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const sql = {
      text:
        'INSERT INTO USERS  (user_name,phone,email,password) VALUES ($1, $2, $3, $4)',
      values: [name, phone, email.toLowerCase(), passwordHash],
    };
    return connection.query(sql.text, sql.values);
  } catch (error) {
    console.log('Error in add user : ', error);
    //throw new Error('Error in Add user');
    throw new Error('Error in Add user');
  }
};
