import React from 'react';

const EssayInput = ({ essay, setEssay, onSubmit }) => {
  return (
    <div>
      <textarea
        placeholder="Paste your essay here..."
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        rows="10"
        cols="80"
      />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default EssayInput;
