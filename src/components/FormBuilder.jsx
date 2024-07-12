import React, { useState } from 'react';
import { FormBuilder as ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (data) => {
    const formData = {
      title,
      description,
      fields: data.task_data
    };

    try {
      const response = await fetch('/api/v1/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Form saved successfully!');
      } else {
        alert('Error saving form: ' + result.errors.join(', '));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Form Builder</h1>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <input
        type="text"
        placeholder="Form Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2"
      />
      <ReactFormBuilder onSave={handleSubmit} />
    </div>
  );
};

export default FormBuilder;