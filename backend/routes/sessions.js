import express from 'express'
const router = express.Router()

import helpers from '../helpers/sessions'

router.route('/')
  .post(helpers.login)

export default router