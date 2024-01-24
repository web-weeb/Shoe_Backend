const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error from server";
  const extraDetails = err.extraDetails || "Error from server";

  return res.status(status).json({
    message,
    extraDetails,
  });
};

module.exports = errorMiddleware;
