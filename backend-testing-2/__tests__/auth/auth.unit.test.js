const request = require('supertest')

const app = require('../../src/app')
const { findUserByEmail } = require('../../src/data/user-data')

jest.mock('../../src/data/user-data')

describe('auth unit tests', () => {
  test('response with friendly message an error exception', async () => {
    findUserByEmail.mockImplementation(() => {
      throw new Error('test pass')
    })

    const response = await request(app)
      .post('/signin')
      .send({
        email: 'john.doe@mail.com',
        password: 'asdasdasd',
      })
      .expect(500)

    expect(response.body.message).toBe('There was an unexpected error')
  })
})
