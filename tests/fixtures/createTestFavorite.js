const createTestFavorite = (invalidValue = false) => {
  const favorite = {movie: '637fa57893d817d3417ae43a' };
  if (invalidValue) {
    favorite.movie = undefined;
  }
  return favorite;
};

module.exports = createTestFavorite;