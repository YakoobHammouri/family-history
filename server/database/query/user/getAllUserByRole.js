const connection = require('../../connection');

module.exports = (role) => {
  const sql = {
    text:
      'SELECT gid,user_name,phone,birth_date,email,university,address,role,profession,email_activate,phone_activate  FROM users where role = $1;',
    values: [role],
  };
  return connection.query(sql.text, sql.values);
};
