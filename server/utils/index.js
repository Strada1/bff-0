function getGeneratedResponse(
  success = true,
  data = null,
  options = null
) {
  return {
    success,
    data,
    ...options,
  };
}

module.exports.getGeneratedResponse = getGeneratedResponse;
