const { PublicError } = require('./PublicError');

class ErrorCatcher {
    constructor() {}
    static async CatchError(error, res) {
        if (error instanceof PublicError) {
            if(error.data) res.status(error.status).json({ message: error.message , data: error.data});
            else res.status(error.status).json({ message: error.message });
        }
        else res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { ErrorCatcher };