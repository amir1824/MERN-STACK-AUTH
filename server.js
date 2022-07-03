// Initialize Express
const express = require('express');

// Initialize env file
const dotenv = require("dotenv");

// Initialize CORS
const cors = require('cors');

// Initialize CookeParser
const cookieParser = require('cookie-parser');

// Initialize XSS
const xss = require('xss-clean');

// Initialize Halmet
const helmet = require('helmet');

// Initialize RateLimit
const rateLimit = require('express-rate-limit');

// Initialize MongoSanitize
const mongoSanitize = require('express-mongo-sanitize');

//Initialize The Routes
const userRouter =require('./routes/userRoutes');


//Starting The  App
const app = express();
// Set security HTTP headers
app.enable('trust proxy');
app.use(cors());
app.options('*', cors(
));
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Json Data
app.use(express.json());

//Data sanitiziation against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization agains XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

dotenv.config();

//Connect To DB
 require('./config/database');

app.listen('8000',()=>
{
    console.log(`App running on port: ${8000} ...`)
})
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1)
  })
})

// ROUTES

app.use('/api/v1/users', userRouter);



















