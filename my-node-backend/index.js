const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});


// Define a POST route
app.post('/api/chat', async (req, res) => {
    // Log the incoming request body
    console.log('Received request body:', req.body);
  
    // Destructure the prompt from the request body
    const { prompt } = req.body;
    // Log the extracted prompt
    console.log('Extracted prompt:', prompt);
  
    // Get the OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    // Log the API key retrieval (not the key itself for security)
    console.log('Retrieved OpenAI API key from environment variables');
  
    try {
      // Make an API request to OpenAI
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        // Specify the model and messages for the API request
        model: 'gpt-3.5-turbo', // or the appropriate model
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      }, {
        // Set authorization headers for the API request
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
  
      // Log the full API response for debugging
      console.log('API response received:', response.data);
      console.log('API response choices received:', response.data.choices[0]);
  
      // Extract and send back the API response
      const botResponse = response.data.choices[0].message.content.trim();
      // Log the extracted bot response
      console.log('Extracted bot response:', botResponse);
  
      res.json({ response: botResponse });
    } catch (error) {
      // Catch and handle any errors
      console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
