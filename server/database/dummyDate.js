const { addUser } = require('./query/user');

addUser({
  name: 'Admin',
  email: 'admin@no.com',
  password: 'Mu123456',
});

addUser({
  name: 'dev',
  email: 'dev@no.com',
  password: 'Ab.123456',
});
