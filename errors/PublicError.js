class PublicError extends Error {
    constructor(message, data) {
      super(message);
      this.name = 'PublicError'; // Set the error name for identification
      this.data = data ? data : null;
    }
}
module.exports = { PublicError };