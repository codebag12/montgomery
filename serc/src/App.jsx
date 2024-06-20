import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  console.log('App component rendered');

  const [initialMessage, setInitialMessage] = useState('');
  console.log('Initial message state:', initialMessage);

  const [messages, setMessages] = useState([]);
  console.log('Messages state initialized:', messages);

  const [message, setMessage] = useState('');
  console.log('Current input message state:', message);

  useEffect(() => {
    console.log('useEffect triggered for initial backend message fetch');
    axios.get('http://localhost:5000/')
      .then(response => {
        console.log('Received initial message from backend:', response.data);
        setInitialMessage(response.data);
      })
      .catch(error => console.error('There was an error fetching initial message!', error));
  }, []);

  const sendChat = async (message) => {
    console.log('sendChat function called with message:', message);
    try {
      const { data } = await axios.post('http://localhost:5000/api/chat', { prompt: message });
      console.log('Received response from backend chat API:', data.response);
      return data.response;
    } catch (error) {
      console.error('There was an error sending chat message!', error);
      return 'Error: Unable to get a response';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with message:', message);

    setMessages((prev) => {
      console.log('Previous messages:', prev);
      const newMessages = [...prev, { message, response: 'Loading...', botResponse: false }];
      console.log('Updated messages after adding loading state:', newMessages);
      return newMessages;
    });

    setMessage('');
    console.log('Input message state reset to empty');

    const response = await sendChat(message);
    console.log('Response from sendChat:', response);

    setMessages((prev) => {
      console.log('Previous messages before adding response:', prev);
      const newMessages = [...prev.slice(0, -1), { message, response, botResponse: true }];
      console.log('Updated messages after receiving response:', newMessages);
      return newMessages;
    });
  };

  return (
    <div className="App">
      {console.log('Rendering App component')}
      <header className="App-header">
        {console.log('Rendering header')}
        <h2>Message from Backend:</h2>
        <p>{initialMessage}</p>
      </header>
      <div className="chat-container">
        {console.log('Rendering chat container')}
        <h2>Chat</h2>
        <div className="messages">
          {console.log('Rendering messages')}
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {console.log('Rendering message at index', index, 'with content:', msg)}
              <div>{msg.message}</div>
              <div>{msg.response}</div>
            </div>
          ))}
          <div className="bottom" />
        </div>
        <h3>Send a message:</h3>
        <form onSubmit={handleSubmit}>
          {console.log('Rendering form')}
          <input
            type="text"
            value={message}
            onChange={(e) => {
              console.log('Input message changed to:', e.target.value);
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
