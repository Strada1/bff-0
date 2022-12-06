import request from 'supertest'
import app from '../app.js'

describe('/movies', () => {
  it('POST', async () => {
    const movie = {
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.2,
      category: '63822396360e1575e73de99a',
      duration: 105,
      director: '63822396360e1575e73de99a'
    }
    const {body} = await request(app).post('/movies').send(movie).expect(201)
    expect(body.title).toEqual(movie.title)
  })
})

describe('/users', () => {
  it('POST', async () => {
    const user = {
      email: 'email@email.com',
      password: '123456'
    }
    await request(app).post('/users').send(user).expect(201)
  })
})

describe('/movies', () => {
  it('GET', async () => {
    await request(app).get('/movies').expect(201)
  })
})

describe('/movies/:id', () => {
  it('PUT', async () => {
    const id = '638f7d4b52852ae32f46ae27'
    const movie = {
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.2,
      category: '63822396360e1575e73de99a',
      duration: 110,
      director: '63822396360e1575e73de99a'
    }
    const {body} = await request(app)
      .put(`/movies/${id}`)
      .send(movie)
      .expect(201)
    expect(body.duration).toEqual(movie.duration)
  })
})

describe('/movies/:id', () => {
  it('PUT', async () => {
    const id = '638f7d4b52852ae32f46ae2'
    const movie = {
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.2,
      category: '63822396360e1575e73de99a',
      duration: 110,
      director: '63822396360e1575e73de99a'
    }
    const {body} = await request(app)
      .put(`/movies/${id}`)
      .send(movie)
      .expect(400)
    // expect(body.duration).toEqual(movie.duration)
  })
})
