import express from 'express'
const router = express.Router()
import auth from '../util/auth'

import helpers from '../helpers/users'

router.route('/')
  .post(helpers.createUser)

router.route('/:id')
  .get(auth, helpers.getUser)

export default router