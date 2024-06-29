import React, { useState, useEffect } from 'react';
import { getForms, createForm } from '../services/formService';

const FormList = ({ onSelectForm }) => {
  const [forms, setForms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState('');
  const [newFormDescription, setNewFormDescription] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await getForms();
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleAddForm = async (e) => {
    e.preventDefault();
    try {
      await createForm({ title: newFormTitle, description: newFormDescription });
      setIsModalOpen(false);
      setNewFormTitle('');
      setNewFormDescription('');
      fetchForms();
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Your Forms</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Add Form
        </button>
      </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Form</h3>
              <form onSubmit={handleAddForm} className="mt-2 text-left">
                <div className="mt-2">
                  <label htmlFor="formTitle" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="formTitle"
                    id="formTitle"
                    value={newFormTitle}
                    onChange={(e) => setNewFormTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="formDescription" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="formDescription"
                    id="formDescription"
                    value={newFormDescription}
                    onChange={(e) => setNewFormDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows="3"
                  ></textarea>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Create Form
                  </button>
                </div>
              </form>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-3 px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormList;