const AppError =  require('../utils/appError')

// Custom error handling function
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
  
    error.message = err.message;
  
    if (err.code === 11000) {
      const message = `Duplicate Field value entered`;
      error = new AppError(message, 400);
    }
  
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new AppError(message, 400);
    }
    if (error.name === 'JsonWebTokenError'){
    error = new AppError('Invalid token. Please log in again!', 401);
    }

    if (error.name === 'TokenExpiredError'){
   new AppError('Your token has expired! Please log in again.', 401);
    }
  
    console.log(error.message);
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  };
  
  module.exports = errorHandler;