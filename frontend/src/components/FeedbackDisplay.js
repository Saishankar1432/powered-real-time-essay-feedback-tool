import React from 'react';

const FeedbackDisplay = ({ feedback }) => {
  return (
    <div>
      <h2>Feedback:</h2>
      <p>{feedback}</p>
    </div>
  );
};

export default FeedbackDisplay;
