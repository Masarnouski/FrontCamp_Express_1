var CustomError = require('./CustomError')

class HttpError extends CustomError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = HttpError