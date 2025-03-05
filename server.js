const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const natural = require('natural');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'sentiment-frontend/build')));

app.post('/analyze', (req, res) => {
    try {
        const text = req.body.text;
        if (!text) throw new Error('No text provided');
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
        const sentiment = analyzer.getSentiment(text.split(' '));
        res.send({ sentiment });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'sentiment-frontend/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});