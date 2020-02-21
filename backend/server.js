import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import usersRoutes from './routes/users'
import sessionsRoutes from './routes/sessions'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/users', usersRoutes)
app.use('/sessions', sessionsRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
