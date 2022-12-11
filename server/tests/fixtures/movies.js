export const dataForNewMovie = {
  title: "Космическая одиссея",
  year: 2001,
  duration: 149,
  categories: ["638220c3b9d7704121379776"],
  directors: ["63822116b9d7704121379786"],
}

export const dataForUpdateMovie = {
  description: 'Some text',
};

export function getMovieId(isValid = true) {
  const validId = '63822340e7e7ba66c4f7a0a9';
  const notValidId = '63822340e7e7ba66c4f7a999';

  return isValid ? validId : notValidId;
}
