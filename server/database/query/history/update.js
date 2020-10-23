const connection = require('../../connection');

const editUserInfo = (data) => {
  const {
    name,
    birthday,
    dateDeath,
    profileImageUrl,
    public_id,
    age,
    gid,
  } = data;

  const sql = {
    text:
      'UPDATE familyHistory set name=$1, birthday=$2, dateDeath=$3, profileImageUrl=$4, public_id=$5,  age=$6 where gid=$7',
    values: [name, birthday, dateDeath, profileImageUrl, public_id, age, gid],
  };
  return connection.query(sql.text, sql.values);
};
module.exports = editUserInfo;
