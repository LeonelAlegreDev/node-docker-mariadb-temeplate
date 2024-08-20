const { PublicError } = require('../errors/PublicError');

class ErrorMiddleware {
    constructor() {}

    static HandleError(error, req, res, next) {
        console.log("Error detected by the error handler middleware");
        if (error instanceof PublicError) {
            if(error.data) res.status(error.status).json({ message: error.message , data: error.data});
            else res.status(error.status).json({ message: error.message });
        }
        else res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { ErrorMiddleware };