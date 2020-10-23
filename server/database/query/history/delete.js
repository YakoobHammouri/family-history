const connection = require('../../connection');

module.exports = (gid) => {
  try {
    const sql = {
      text: 'delete from  familyHistory where gid = $1 ',
      values: [gid],
    };
    return connection.query(sql.text, sql.values);
  } catch (error) {
    console.log('Error in delete History : ', error);
    throw new Error('Error in delete Histopry');
  }
};
