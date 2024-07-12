import React from 'react';
import ReactDOM from 'react-dom';

export function mount(elementId, formId) {
  const root = ReactDOM.createRoot(document.getElementById(elementId));
  root.render(
    <div>
      <h1>Embed Form</h1>
      <p>Form ID: {formId}</p>
    </div>
  );
}