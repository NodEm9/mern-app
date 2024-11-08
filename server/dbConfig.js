// Purpose: MongoDB connection configuration
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function db (){
  mongoose.connect(process.env.MONGO_URI, { dbName: 'internal-com-message' });

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
  });

  mongoose.Promise = global.Promise;

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });
};

export default db;

