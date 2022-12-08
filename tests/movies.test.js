import request from 'supertest'
import app from '../app.js'
import {jest} from '@jest/globals'
import movieCreate from '../fixtures/movies/movieForCreate.json'
import movieUpdate from '../fixtures/movies/movieForUpdate.json'
import userCreate from '../fixtures/users/userForCreate.json'
import passport from 'passport'

jest.spyOn(console, 'log').mockImplementation(() => 'test')
jest.spyOn(console, 'error').mockImplementation(() => 'test')
jest.spyOn(passport, 'authenticate').mockImplementation(() => {
  return (req, res, next) => {
    next()
  }
})

describe('/movies', () => {
  it('POST', async () => {
    const {body} = await request(app)
      .post('/movies')
      .send(movieCreate)
      .expect(201)
    expect(body.title).toEqual(movieCreate.title)
  })
})

describe('/users', () => {
  it('POST', async () => {
    await request(app).post('/users').send(userCreate).expect(201)
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
    const {body} = await request(app)
      .put(`/movies/${id}`)
      .send(movieUpdate)
      .expect(201)
    expect(body.duration).toEqual(movieUpdate.duration)
  })
})

describe('/movies/:id', () => {
  it('PUT', async () => {
    const id = '638f7d4b52852ae32f46ae2'
    await request(app).put(`/movies/${id}`).send(movieUpdate).expect(400)
  })
})

describe('/movies/addToFavorite/:id', () => {
  it('POST', async () => {
    const id = '638224afde6a9c61def3dcab'
    await request(app).put(`/movies/addFavorite/${id}`).expect(201)
  })
})

describe('/movies/favorites/', () => {
  it('GET', async () => {
    await request(app).get('/movies/favorites/').expect(201)
  })
})
