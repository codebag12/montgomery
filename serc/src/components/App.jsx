import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function App() {
  const [initialMessage, setInitialMessage] = useState('');
 const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => {
        setInitialMessage(response.data);
        
      })
      .catch(error => console.error('There was an error fetching initial message!', error));
      
  }, []);

  const goToChat = () => {
    navigate('/chat');
  };

 
  return (
    <div className="App">
      <header className="App-header">
        <h2>Message from Backend:</h2>
        <p>{initialMessage}</p>
        <button onClick={goToChat}>Go to Chat</button>
      </header>
    </div>
  );
}

export default App;
