module.exports = (req, res) => {
  res.clearCookie('AuthToken').sendStatus(200);
};
