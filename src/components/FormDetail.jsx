import React, { useState, useEffect } from 'react';
import { getForm, getQuestions } from '../services/formService';

const FormDetail = ({ formId, onBack }) => {
  const [form, setForm] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
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

    fetchFormAndQuestions();
  }, [formId]);

  if (!form) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">{form.title}</h2>
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Forms
        </button>
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
    </div>
  );
};

export default FormDetail;