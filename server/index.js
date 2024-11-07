import express from 'express';
const router = express.Router();
const PORT = 5000;
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import { handler } from './middleware/errorHandler.js';


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
    .find({}, 'messageText createdAt')
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'No messages found' });
      }
      res.json(data);
    })
    .catch(next);
});

// POST request to create a new message
app.post('/messages', async (req, res, next) => {
  if (req.body.messageText) {
    MessageModel.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    console.log(await handler.handleError(req, 400));
    res.json(await handler.handleError(req, 400));
  }
});

// Error handling middleware
app.use(handler.handleError);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;