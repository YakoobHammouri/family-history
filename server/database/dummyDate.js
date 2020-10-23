const { addUser } = require('./query/user');

addUser({
  name: 'Admin',
  email: 'admin@no.com',
  password: 'Mu123456',
});
