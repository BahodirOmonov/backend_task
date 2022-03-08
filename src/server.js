import express from 'express'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

// import middleware
import fetching from './middleware/postgres.js'

app.use(fetching)

// import Routers
import UserRouter from './routes/user.js'

app.use("/users", UserRouter)

app.listen(PORT, () => console.log("Server is running on http://localhost:" + 5000))