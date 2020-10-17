const connection = require('../../connection');

module.exports = (id) => {
  const sql = {
    text: 'SELECT * FROM users where gid = $1;',
    values: [id],
  };
  return connection.query(sql.text, sql.values);
};
