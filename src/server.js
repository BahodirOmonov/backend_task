import express from 'express'
import PORT from '../config.js'

const app = express()

app.use(express.json())

// import middleware

import fetching from './middleware/postgres.js'

app.use(fetching)

// import Routers

import UserRouter from './routes/user.js'
import MessageRouter from './routes/message.js'

app.use("/users", UserRouter)
app.use("/messages", MessageRouter)

app.listen(PORT, () => console.log("Server is running on http://localhost:" + 5000))