import React, { useState } from 'react';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [sentiment, setSentiment] = useState(null);

    const analyzeSentiment = async () => {
        try {
            // Mock response (replace with real backend later)
            const mockSentiment = text.toLowerCase().includes('good') ? 0.8 : text.toLowerCase().includes('bad') ? -0.5 : 0.1;
            setSentiment(mockSentiment);
        } catch (error) {
            console.error('Error:', error);
            setSentiment('Error analyzing sentiment');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sentiment Analysis</h1>
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Enter text here..."
                ></textarea>
                <button onClick={analyzeSentiment}>Analyze</button>
                {sentiment !== null && <p>Sentiment score: {sentiment}</p>}
            </header>
        </div>
    );
}

export default App;