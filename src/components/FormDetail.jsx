import React, { useState, useEffect } from 'react';
import { getForm, getQuestions, createQuestion } from '../services/formService';

const FormDetail = ({ formId, onBack }) => {
  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newQuestionType, setNewQuestionType] = useState('text');

  useEffect(() => {
    fetchFormAndQuestions();
  }, [formId]);

  const fetchFormAndQuestions = async () => {
    try {
      const formResponse = await getForm(formId);
      setForm(formResponse.data);

      const questionsResponse = await getQuestions(formId);
      setQuestions(questionsResponse.data);
    } catch (error) {
      console.error('Error fetching form details:', error);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await createQuestion(formId, { content: newQuestionContent, question_type: newQuestionType });
      setIsModalOpen(false);
      setNewQuestionContent('');
      setNewQuestionType('text');
      fetchFormAndQuestions();
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  if (!form) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">{form.title}</h2>
        <div>
          <button
            onClick={onBack}
            className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Forms
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Question
          </button>
        </div>
      </div>
      <p className="text-xl text-gray-500">{form.description}</p>
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Question {index + 1}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Type: {question.question_type}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Question
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {question.content}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Question</h3>
              <form onSubmit={handleAddQuestion} className="mt-2 text-left">
                <div className="mt-2">
                  <label htmlFor="questionContent" className="block text-sm font-medium text-gray-700">Question</label>
                  <input
                    type="text"
                    name="questionContent"
                    id="questionContent"
                    value={newQuestionContent}
                    onChange={(e) => setNewQuestionContent(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">Question Type</label>
                  <select
                    name="questionType"
                    id="questionType"
                    value={newQuestionType}
                    onChange={(e) => setNewQuestionType(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Add Question
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

export default FormDetail;