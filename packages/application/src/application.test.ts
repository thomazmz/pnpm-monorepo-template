import supertest from 'supertest'
import { application } from './application'

describe('application tests', () => {
  it('should return concatenated name', async () => {
    const request = supertest(application)
    const response = await request.get('?name=Thomaz&surname=Zandonotto')
    expect(response.text).toBe('Hello thomaz-zandonotto!')
  })
})