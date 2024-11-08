import React, { useEffect, useRef, useState } from 'react'
import formattedDate from './utils/formatDate'
import messageSound from './assets/sounds/tap-notification.mp3'
import logo from './assets/img/chat-logo.svg'
import instance from './config/axiosConfig'

const axios = instance

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const errRef = useRef(null);

  useEffect(() => {
    return () => fetchMessages()
  }, []);

  // Fetch messages from the server
  const fetchMessages = async () => {
    const response = await axios.get('/messages');
    if (!response.data) return setMessages(['No messages']);
    const date = await response.data[0]?.createdAt;
    setCreatedAt(date);
    setMessages(response.data);
  };

  // Send a message to the server
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message === '') {
      setErr('You must enter a message');
    } else {
      await axios.post('/messages',
        {
          messageText: message
        });

      // Play a sound when the message is sent
      const audion = new Audio(messageSound);
      audion.play();
      setSuccess('Message sent ✅');

      fetchMessages();
      setMessage('');
      if (isFocused) setErr('');
    }
    errRef.current?.focus();
  };

  return (
    <>
      <div ref={errRef}>{err && err ? <p className='error'>{err}</p> : null}</div>
      <div>{success ? <p className='success'>{success}</p> : null}</div>
      <form onSubmit={sendMessage}>
        <div className='form-header'>
          <img src={logo} alt='chat logo' />
          <h2>Peep 2 Peep</h2>
        </div>
        <fieldset>
          <legend htmlFor='message'>Message</legend>
          <input
            type='text'
            value={message}
            placeholder='Enter a message'
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setMessage(e.target.value)}
            className='form-control'
          />
          <button type='submit'>Send</button>
        </fieldset>
      </form>
      <ul>
        {messages.map((message, index) => (
          <fieldset key={index}>
            <legend>Message {index + 1}</legend>
            <p>
              <small>{formattedDate(message.createdAt)}</small>
              <span>{message.messageText}</span>
            </p>
          </fieldset>
        ))}
      </ul>
    </>
  )
}

export default Messages