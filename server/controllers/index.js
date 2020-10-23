const router = require('express').Router();

const {
  login,
  profile,
  editprofile,
  changePassword,
  logout,
} = require('./user');

const uploadImage = require('./uploadImage');
const deleteImage = require('./deleteImage');

const {
  addHistory,
  getAllHistory,
  deleteHistory,
  updateHistory,
} = require('./history');

const isAuth = require('../middleware/isAuth');

const checkToken = require('../middleware/checkToken');

const checkPermissions = require('../middleware/checkPermissions');

const checkCurrentPassword = require('../middleware/checkCurrentPassword');

router.post('/isAuth/', isAuth, checkToken);
router.post('/isAccess/', isAuth, checkPermissions(), checkToken);

// login user , Create Auth Token Cookies
router.post('/user/login', login);

router.post('/user/logout', logout);

router.post('/api/upload', isAuth, uploadImage);
router.delete('/api/deleteUpload', isAuth, deleteImage);

router.get('/api/user/profile', isAuth, profile);
router.put('/api/user/edituserinfo', isAuth, editprofile);

router.post('/api/addHistory', isAuth, addHistory);
router.get('/api/getAllHistory', isAuth, getAllHistory);
router.delete('/api/deleteHistory', isAuth, deleteHistory);
router.post('/api/editHistory', isAuth, updateHistory);

router.post(
  '/api/user/changePassword',
  isAuth,
  checkCurrentPassword,
  changePassword,
);

module.exports = router;
