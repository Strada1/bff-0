import request from 'supertest';
import { app } from '../server.js';

describe('/movies', () => { // тестируем роут movies

  it('POST / should create movie and return status 200', async () => { // проверяем метод POST для этого роута
    // это условный код, в котором пока нет реального запроса
    const movie = {
      "title": "Космическая одиссея",
      "year": 2001,
      "duration": 149,
    };

    const { body } = await request(app) // делаем запрос к нашему серверу
      .post('/api/movies') // по нужному роуту
      .send(movie) // отправляем объект с новым фильмом
      .expect(201); // и ожидаем в ответ статус 201 - Created

    expect(body.title).toEqual(movie.title); // проверяем что в ответе отдается созданный фильм
  });

  it('GET / should return movie and status 200', async() => {
    const movieId = '63822340e7e7ba66c4f7a0a9';
    const movie = {
      "title": "Убить Билла",
      "year": 2003,
      "duration": 111,
    }

    const { body } = await request(app)
      .get(`/api/movies/${movieId}`)
      .expect(200);

    expect(body.title).toBe(movie.title);
  });

  it('GET / should return status 404', async () => {
    const badMovieId = '63822340e7e7ba66c4f7a999';

    await request(app)
      .get(`/api/movies/${badMovieId}`)
      .expect(404);
  });

  it('PUT / should return updated movie and status 200', async () => {
    const movieId = '63822340e7e7ba66c4f7a0a9';
    const newDataForMovie = {
      description: 'Some text',
    };

    const { body } = await request(app)
      .put(`/api/movies/${movieId}`)
      .send(newDataForMovie)
      .expect(200);

    expect(body.description).toBe(newDataForMovie.description);
  });

});

// Тесты на плохие запросы
