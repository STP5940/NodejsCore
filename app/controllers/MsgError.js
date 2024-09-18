class MsgError extends Error {
  constructor(message, httpcode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.httpcode = httpcode;
  }
}

module.exports = MsgError;