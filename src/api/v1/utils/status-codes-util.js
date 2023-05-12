module.exports = {
  success: {
    OK: {
      code: 200,
      status: 'OK'
    }
  },
  clientError: {
    badRequest: {
      code: 400,
      status: 'Bad Request'
    },
    unauthorized: {
      code: 401,
      status: 'Unauthorized'
    },
    forbidden: {
      code: 403,
      status: 'Forbidden'
    },
    notFound: {
      code: 404,
      status: 'Not Found'
    }
  }
};
