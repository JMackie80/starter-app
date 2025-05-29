import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport'
import * as bodyParser from 'body-parser'

import indexRouter from './routes/index'
import usersRouter from './routes/userRoute'
import authRouter from './routes/authRoute'
import { setupPassport } from './middleware/passport'

dotenv.config()

const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false 
}))


// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('An error occurred:', err)

  // Send a generic error response to the client
  res.status(500).json({ 
    message: 'Internal Server Error'
  })
})

setupPassport()

const corsOptions = { 
  origin: 'http://localhost:3000', 
  credentials: true
}
app.use(bodyParser.json({ limit: '50mb' })); // Set limit to 50 megabytes
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

module.exports = app
