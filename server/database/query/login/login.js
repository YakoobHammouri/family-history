const connection = require('../../connection');

const getuserlogin = (reqbody) => {
 
  const sql = {
    text: 'SELECT email ,password,gid,user_name FROM users WHERE email =$1;',
    values: [reqbody.email],
  };
  return connection.query(sql.text, sql.values);
};
module.exports = getuserlogin;
