import axiso from 'axios';
export default (role) => {
  return !role ? axiso.post('/isAuth/') : axiso.post('/isAccess/', { role });
};
