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

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET request to get all messages
app.get('/messages', (req, res, next) => {
  MessageModel
    .find({}, 'messageText')
    .then(data => res.json(data))
    .catch(next);
});

// POST request to create a new message
app.post('/messages', (req, res, next) => {
  if (req.body.messageText) {
    MessageModel.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json(errorHandler('Message text is required'));
  }
});

// Error handling middleware
function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'The user is not authorized' });
    return next(err)
  }

  if (err.name === 'ValidationError') {
    res.status(422).json({ error: err.message });
    return next(err)
  }

  if (err.name === 'CastError') {
    res.status(400).json({ error: 'Invalid ID' });
    return next(err)
  }
  
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