const connection = require('../../connection');

module.exports = (history) => {
  const {
    name,
    birthday,
    dateDeath,
    profileImageUrl,
    public_id,
    age,
  } = history;

  try {
    const sql = {
      text:
        'INSERT INTO familyHistory  (name,birthday,dateDeath,profileImageUrl,public_id,age) VALUES ($1, $2, $3, $4,$5,$6)',
      values: [name, birthday, dateDeath, profileImageUrl, public_id, age],
    };
    return connection.query(sql.text, sql.values);
  } catch (error) {
    console.log('Error in add History : ', error);
    throw new Error('Error in Add Histopry');
  }
};
