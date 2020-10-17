const router = require('express').Router();

const {
  getEventById,
  getupComingEvent,
  takePlace,
  cancelPlace,
} = require('./event');

const {
  postEvent,
  getEventsDay,
  takeMemberCode,
  getEventMembers,
  getAdminEvents,
  getAdminEventDetail,
  getNewMember,
  getAllMember,
  addMemberToEvent,
} = require('./admin');

const {
  login,
  profile,
  editprofile,
  signup,
  userEvent,
  checkUserEmail,
  changePassword,
  logout,
} = require('./user');

const getcategory = require('./category/getcategory');

const isAuth = require('../middleware/isAuth');

const checkToken = require('../middleware/checkToken');

const checkPermissions = require('../middleware/checkPermissions');

const checkEmail = require('../middleware/checkEmail');

const checkCurrentPassword = require('../middleware/checkCurrentPassword');

const isMemberEnrollEvent = require('../middleware/isMemberEnrollEvent');

const { ROLE } = require('../helpers/Constants');

router.post('/isAuth/', isAuth, checkToken);
router.post('/isAccess/', isAuth, checkPermissions(), checkToken);

// login user , Create Auth Token Cookies
router.post('/user/login', login);

router.post('/user/logout', logout);

// post new User
router.post('/api/user/signup', checkEmail, signup);

router.post('/api/admin/user/newmember', checkEmail, getNewMember);

router.get('/api/user/checkUserEmail/:email', checkEmail, checkUserEmail);

// get event Details => pageName : EventDetails
router.get('/api/event/:id', getEventById);

// get up Coming Event to Display in Home Page
router.get('/api/envet/getupComingEvent', getupComingEvent);

// get user Code of event => pageName : EventDetails , Login restricted
router.get('/api/user/userCode/:eventId', isAuth, userEvent);

// enroll in event  => pageName : EventDetails , Login restricted
router.post('/api/event/takePlace', isAuth, takePlace);

// cancel Registration  in event  => pageName : EventDetails , Login restricted
router.delete('/api/event/cancelPlace', isAuth, cancelPlace);

//================================================================
//============== Admin Endpoint ==================================
// open user Profile , contains userInfo , Event of user
router.get('/api/user/profile', isAuth, profile);
router.put('/api/user/edituserinfo', isAuth, editprofile);

router.get('/api/admin/eventDetail/:id', isAuth, getAdminEventDetail);

router.get('/api/admin/getcategory', isAuth, getcategory);

router.post('/api/admin/event/addEvent', isAuth, postEvent);

router.get(
  '/api/admin/getEventsDay',
  isAuth,
  checkPermissions(ROLE.ADMIN),
  getEventsDay,
);

router.get(
  '/api/admin/event/TakeAttendance/:id',
  isAuth,
  checkPermissions(ROLE.ADMIN),
  getEventMembers,
);
router.post(
  '/api/admin/event/TakeAttendance/',
  isAuth,
  checkPermissions(ROLE.ADMIN),
  takeMemberCode,
);

router.get(
  '/api/envet/getAdminEvent',
  isAuth,
  checkPermissions(ROLE.ADMIN),
  getAdminEvents,
);

router.get(
  '/api/admin/user/getAllMember',
  isAuth,
  checkPermissions(ROLE.ADMIN),
  getAllMember,
);

router.post(
  '/api/admin/Event/add-Member-to-event',
  isAuth,
  checkPermissions(ROLE.ADMIN),
  isMemberEnrollEvent,
  addMemberToEvent,
);

router.post(
  '/api/user/changePassword',
  isAuth,
  checkCurrentPassword,
  changePassword,
);

module.exports = router;
