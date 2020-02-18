import mongoose from 'mongoose'
import User from '../usermodel.js'

import 'babel-polyfill'

const mongoUrl = "mongodb://localhost/authAPITest"


beforeAll(async () => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.Promise = Promise
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.connection.close()
})

afterEach(async () => {
  await User.deleteMany({})
})

describe('data model tests', () => {
  it('creates a user', async () => {
    await new User({
      name: 'name',
      email: 'email@email.com',
      password: 'passwordhash'
    }).save()
    const numberOfUsers = await User.countDocuments({})
    expect(numberOfUsers).toEqual(1)
  }),
    it('gets a user', async () => {
      const newUser = await new User({
        name: 'name',
        email: 'email@email.com',
        password: 'passwordhash'
      }).save()
      const fetchedUser = await User.findOne({ name: 'name' })
      expect(newUser._id).toEqual(fetchedUser._id)
    }),
    it('generates an access token', async () => {
      const user = await new User({
        name: 'name',
        email: 'email@email.com',
        password: 'passwordhash'
      }).save()
      expect(user.accessToken.length).toEqual(256)
    }),
    it('validates all required fields', async () => {
      try {
        const userNoName = await new User({
          email: 'email@email.com',
          password: 'passwordhash'
        }).save()
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.name).toBe('ValidationError')
        expect(err.message).toBe('User validation failed: name: Path `name` is required.')
      }
      try {
        const userNoEmail = await new User({
          name: 'name',
          password: 'passwordhash'
        }).save()
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.name).toBe('ValidationError')
        expect(err.message).toBe('User validation failed: email: Path `email` is required.')
      }
      try {
        const userNoPw = await new User({
          name: 'name',
          email: 'email@email.com',
        }).save()
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.name).toBe('ValidationError')
        expect(err.message).toBe('User validation failed: password: Path `password` is required.')
      }
      const numberOfUsers = await User.countDocuments({})
      expect(numberOfUsers).toEqual(0)
    })
})

