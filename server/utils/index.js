function getGeneratedResponse (
  success = true,
  response = null,
  // message = '',
  options = null
) {
  return {
    success,
    response,
    // message,
    ...options,
  };
}

module.exports.getGeneratedResponse = getGeneratedResponse;
