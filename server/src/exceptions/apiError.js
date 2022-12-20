export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,
};

class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest_404(message, errors = []) {
    return new ApiError(HTTP_STATUSES.BAD_REQUEST_400, message, errors);
  }

  static Unauthorized_401() {
    return new ApiError(HTTP_STATUSES.UNAUTHORIZED_401, 'User not authorized');
  }

  static Forbidden_403(message) {
    return new ApiError(HTTP_STATUSES.FORBIDDEN_403, message);
  }

  static NotFound_404(message) {
    return new ApiError(HTTP_STATUSES.NOT_FOUND_404, message);
  }
}

export default ApiError;
