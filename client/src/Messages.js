import React, { useEffect, useState  } from 'react'
import axios from 'axios'

function Messages() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    return () => fetchMessages()
  }, []);

  // Fetch messages from the server
  const fetchMessages = async () => {
    const response = await axios.get('http://172.104.246.147:5000/messages')
    if (!response.data) {
      return setMessages(['No messages'])
    }
    setMessages(response.data)
    console.log(response.data)
  };

  // Send a message to the server
  const sendMessage = async () => {
    if (message === '') return alert('Message cannot be empty');
    await axios.post('http://172.104.246.147:5000/messages', {
      messageText: message
    })
    setMessage('')
    fetchMessages();
  };


  return (
    <>
      <form>
        <fieldset>
          <legend htmlFor='message'>Message</legend>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          />
          <button type='button' onClick={sendMessage}>Send</button>
          </fieldset>
 
      </form>
      <ul>
        {messages.map((message, index) => (
          <fieldset key={index}>
            <legend>Message {index + 1}</legend>
            <p>
            {message.messageText}
            </p>
          </fieldset>
        ))}
      </ul>
    </>
  )
}

export default Messages