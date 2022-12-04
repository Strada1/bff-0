class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError(401, 'User not authorized');
  }

  static Forbidden(message) {
    return new ApiError(403, message);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message) {
    return new ApiError(404, message);
  }
}

export default ApiError;
