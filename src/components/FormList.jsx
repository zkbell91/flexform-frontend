import React, { useState, useEffect } from 'react';
import { getForms } from '../services/formService';

const FormList = ({ onSelectForm }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await getForms();
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Your Forms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map(form => (
          <div key={form.id} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{form.title}</h3>
            <p className="text-gray-500">{form.description}</p>
            <button
              onClick={() => onSelectForm(form.id)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
            >
              View Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;