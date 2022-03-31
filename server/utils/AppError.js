class AppError extends Error {
  /**
   * @param {Error} error original error object
   * @param {String} controllerName name of controller where error ocurred
   * @param {String} controllerMethod name of method where error occurred
   * @param {Number} status HTML Status code (if applicable)
   */
  constructor(error, controllerName, controllerMethod, status = 500) {
    super(error.message);  // bult-in param for Error object 
    this.serverLog = `ERROR: ${controllerName}.${controllerMethod}: ${error.message}`;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;