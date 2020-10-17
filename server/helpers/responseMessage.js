// this messages using as reaponse of fetch , xhr  request
module.exports = {
  successMessage: (data, messag) => ({
    status: 200,
    messag,
    data,
  }),
  FaildLoginMessage: (data, messag) => ({
    status: 403,
    messag,
    data,
  }),
  FailedMessage: (data, messag) => ({
    status: 400,
    messag,
    data,
  }),

  UnauthorizedMessage: (data, messag) => ({
    status: 403,
    messag,
    data,
  }),
  NotFoundMessage: (data, messag) => ({
    status: 404,
    messag,
    data,
  }),

  InternalErrorMessage: (data, messag) => ({
    status: 501,
    messag,
    data,
  }),
};
