import React, { useState } from 'react';
import axios from 'axios';
import './styles/styles.css';
import EssayInput from './components/EssayInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import CameraInput from './components/CameraInput';

function App() {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState('');
  const [scannedText, setScannedText] = useState('');

  const handleSubmit = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', { essay: text });
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback('Error fetching feedback. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <h1>Real-Time Essay Feedback Tool</h1>
      <EssayInput essay={essay} setEssay={setEssay} onSubmit={() => handleSubmit(essay)} />
      <CameraInput setScannedText={setScannedText} />
      {scannedText && (
        <div>
          <h2>Scanned Text:</h2>
          <p>{scannedText}</p>
          <button onClick={() => handleSubmit(scannedText)}>Submit Scanned Text</button>
        </div>
      )}
      <FeedbackDisplay feedback={feedback} />
    </div>
  );
}

export default App;
