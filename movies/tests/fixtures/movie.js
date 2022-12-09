const movie = {
  title: 'Test movie title',
  year: 2022,
  duration: 100,
  category: '63776678555a3a111e5d39a2',
  director: '63777975554f02c21b661c3c',
  comments: []
};

const invalidMovie = {
  title: 'Invalid^{} title',
  year: '202two',
  director: '63777975554f02c21'
};

module.exports = { movie, invalidMovie };