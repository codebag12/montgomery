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

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo', // or the appropriate model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const botResponse = response.data.choices[0].message.content.trim();
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
