exports.success = (req, res, message, status) => {
  let statusCode = status || 200;
  let statusMessage = message || '';
  // Response
  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
}

exports.error = (req, res, message, status) => {
  let statusCode = status || 500;
  let statusMessage = message || 'Internal server error';
  // Response
    res.status(statusCode).send({
      error: true,
      status: status,
      body: message,
    });
}
