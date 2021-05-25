export default (err, req, res, next) => {
  const messages = [];
  err.type = err.type || 'Error';

  // handle validation errors
  if (err.name === 'ValidationError') {
    err.statusCode = err.statusCode || 400;
    if (err.errors.password) {
      messages.push(err.errors.password.message);
    }
    if (err.errors.name) {
      messages.push(err.errors.name.message);
    }
    if (err.errors.email) {
      messages.push(err.errors.email.message);
    }
  } else {
    err.statusCode = err.statusCode || 500;
  }

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      type: err.type,
      error: err,
      message: messages.length > 0 ? messages : err.message,
      stack: err.stack
    });
  } else {
    res.status(err.statusCode).json({
      type: err.type,
      message: messages.length > 0 ? messages : err.message
    });
  }
};
