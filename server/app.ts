import express, { Request, Response, NextFunction } from 'express'
import path, { dirname } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport'
import { fileURLToPath } from 'url'
import helmet from 'helmet'

import indexRouter from './routes/index'
import usersRouter from './routes/userRoute'
import userProfileRouter from './routes/userProfileRoute'
import authRouter from './routes/authRoute'
import { setupPassport } from './middleware/passport'

dotenv.config()

const app = express()

//app.use(helmet())

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
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

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// List of allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:3001'
];

// Dynamic origin check
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if you need to support cookies
}

app.use(express.json({ limit: '50mb' })) // Set limit to 50 megabytes
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/userProfiles', userProfileRouter)
app.use('/auth', authRouter)

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

export default app
