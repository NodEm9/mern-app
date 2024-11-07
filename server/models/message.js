import mongoose from "mongoose";

// Create a new schema for our message data
const MessageSchema = new mongoose.Schema({
  messageText: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
});


// Create a model from the schema
const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;