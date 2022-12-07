const createTestMovie = (invalidValues = false) => {
  const movie = {
    title: 'The Shawshank Redemption',
    year: '1994-10-14',
    duration: 30,
    director: '637bbc6d119112bc0e264ecc',
    category: '637674c9bc74e1d6e40601a9',
    description: 'The coolest story about jail',
  };

  if (invalidValues) {
    movie.title = '';
    movie.year = '';
  }

  return movie;
};

module.exports = createTestMovie;
