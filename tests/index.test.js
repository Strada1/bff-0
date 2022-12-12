import request from 'supertest'
import app from '../index.js'
import {jest} from '@jest/globals'

jest.spyOn(console, 'log').mockImplementation(() => 'test')
jest.spyOn(console, 'error').mockImplementation(() => 'test')

describe('/', () => {
  it('GET', async () => {
    await request(app).get('/').expect(200)
  })
})
