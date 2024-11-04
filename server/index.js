import express from 'express';
const router = express.Router();
const PORT = 5000;
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';

const app = express();
import db from './dbConfig.js';
db();

import MessageModel from './models/message.js';

/**
 * App Variables 
 * app: Express application
 * @custom Middlewares 
 */
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * Endpoints
 * @description Define the endpoints for the application to handle GET requests
 * @param {string} path - Endpoint URL
 * @returns {object} - The response object in JSON format
 */
app.get('/messages', (req, res, next) => {
  /**
   * @description Fetch all messages from the database
   * @param {object} MessageModel - The message model
   * @returns {object} - The response object in JSON format
   */
  MessageModel
    .find({}, 'messageText')
    .then(data => res.json(data))
    .catch(next);
});

/**
 * @description Define the endpoints for the application to handle POST requests
 * @param {string} path - Endpoint URL
 * @returns {object} - The response object in JSON format
 */
app.post('/messages', (req, res, next) => {
  /**
   * @description check if message text is provided
   * @param {object} req - The request object
   * If message text is provided, create a new message object in JSON format and store it in the database
   * Otherwise, return a message asking the user to provide a message text
   */
  if (req.body.messageText) {
    MessageModel.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json(errorHandler('Message text is required'));
  }
});

/**
 * @description handle errors
 * @param {object} err - The error object 
 * @returns {object} - The response object in JSON format
 * @custom error handling middleware for the application
 */
function errorHandler(err, req, res, next) {
  /**
   * @description handle UnauthorizedError 
   * @param {object} err - The error object
   */
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'The user is not authorized' });
    return next(err)
  }

/**
 * @description handle ValidationError
 * @param {object} err - The error object
 */
  if (err.name === 'ValidationError') {
    res.status(422).json({ error: err.message });
    return next(err)
  }
  /**
   * @description handle CastError
   * @param {object} err - The error object
   */
  if (err.name === 'CastError') {
    res.status(400).json({ error: 'Invalid ID' });
    return next(err)
  }
  
  /**
   * @description handle MongoError
   * @param {object} err - The error object
   */
  if (err.name === 'MongoError') {
    res.status(409).json({ error: 'Duplicate key' });
    return next(err)
  }

  process.exit(1);
  res.status(500).json({ error: err });
}

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
 
export default app;