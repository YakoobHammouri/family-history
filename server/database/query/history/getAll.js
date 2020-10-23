const connection = require('../../connection');

module.exports = () => {
  try {
    const sql = {
      text: 'select * from  familyHistory ',
    };
    return connection.query(sql.text);
  } catch (error) {
    console.log('Error in add History : ', error);
    throw new Error('Error in Add Histopry');
  }
};
