import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendChat = async (message) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/chat', { prompt: message });
      return data.response;
    } catch (error) {
      console.error('There was an error sending chat message!', error);
      return 'Error: Unable to get a response';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessages((prev) => {
      console.log('Previous state of messages:', prev);  // Log the previous state
      
      const newMessage = { message, response: 'Loading...', botResponse: false };
      console.log('New message to add:', newMessage);  // Log the new message being added
      
      const newMessages = [...prev, newMessage];
      console.log('New state of messages:', newMessages);  // Log the new state
      
      return newMessages;
    });
    
    setMessage('');

    const response = await sendChat(message);

    setMessages((prev) => {
      const newMessages = [...prev.slice(0, -1), { message, response, botResponse: true }];
      return newMessages;
    });
  };

  return (
    <div className="Chat">
      <div className="chat-container">
        <h2>Chat</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <div>{msg.message}</div>
              <div>{msg.response}</div>
            </div>
          ))}
          <div className="bottom" />
        </div>
        <h3>Send a message:</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
