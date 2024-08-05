class PublicError extends Error {
  constructor(message, data, status) {
    super(message);
    this.name = 'PublicError'; // Set the error name for identification
    this.data = data ? data : null;
    this.status = status ? status : 400;
  }
}
module.exports = { PublicError };