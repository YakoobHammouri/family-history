// this method use  with isAuth to check Toke
// if the isAuth retrun next(),
// then the token Ok
// otherwise the isAuth will Return status 403
module.exports = (req, res) => {
  res.status(200).json({
    user: {
      name: req.user.user_name,
    },
  });
};
