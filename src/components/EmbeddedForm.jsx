import React, { useState, useEffect } from 'react';

const EmbeddedForm = ({ formId }) => {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!formId) return; // Don't fetch if formId is not provided
    console.log("Fetching form with ID:", formId);
    fetch(`http://localhost:3001/api/v1/forms/${formId}/embed`)
      .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        setForm(data);
      })
      .catch(error => console.error('Error:', error));
  }, [formId]);

  if (!form) return <div>Loading...</div>;

  return (
    <form className="flexform-container">
      <h2 className="flexform-title">{form.title}</h2>
      {form.questions.map(question => (
        <div key={question.id} className="flexform-question">
          <label htmlFor={`q_${question.id}`}>{question.content}</label>
          <input type="text" id={`q_${question.id}`} name={`q_${question.id}`} required />
        </div>
      ))}
      <button type="submit" className="flexform-submit">Submit</button>
    </form>
  );
};

export default EmbeddedForm;