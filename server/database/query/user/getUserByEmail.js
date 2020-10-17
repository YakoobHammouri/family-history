const connection = require('../../connection');

module.exports = (email) => {
  const sql = {
    text: 'SELECT * FROM users where email = $1;',
    values: [email],
  };
  return connection.query(sql.text, sql.values);
};
