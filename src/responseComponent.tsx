import React, { useState, useEffect } from 'react';
import './App.css'; // relative path
import './index.css';

const ApiResponseUI = () => {
  // Initializing state with the API response (You would set this state dynamically based on your API response)
  const [apiResponse, setApiResponse] = useState({
    color_scheme: false,
    dimensions: false,
    image_quality: true,
    orientation: false,
    product_valid: true,
    spelling_check: false,
    text_correct: false
  });

  return (
    <div className="api-response-container">
      <h2 className="title">API Response</h2>
      <div className="response-items">
        {Object.entries(apiResponse).map(([key, value]) => (
          <div key={key} className="response-item">
            <span className="key">{key.replace('_', ' ').toUpperCase()}:</span>
            <span
              className={`value ${value ? 'true' : 'false'}`}
              style={{ color: value ? 'green' : 'red' }}
            >
              {value ? '✔️ Yes' : '❌ No'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiResponseUI;