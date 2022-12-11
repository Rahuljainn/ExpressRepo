import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import errorHandler from './middleware/error.js'
import connectDb from './config/db.js'

//set config vars to be available in process.env object
dotenv.config({ path: './config/config.env' })

//DB Connection
connectDb()

//route file
import bootcamps from './routes/bootcamp.js'
import courses from './routes/courses.js'

//express app
const app = express()

app.use(express.json())

//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`listening on ${PORT} in ${process.env.NODE_ENV}`)
)

//unhandled promise rejection
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`)
//   //close server and exit process
//   server.close(() => process.exit(1))
// })
