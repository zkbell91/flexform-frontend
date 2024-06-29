import api from './api';

export const getForms = () => api.get('/forms');
export const getForm = (id) => api.get(`/forms/${id}`);
export const getQuestions = (formId) => api.get(`/forms/${formId}/questions`);
export const createForm = (formData) => api.post('/forms', { form: formData });
export const createQuestion = (formId, questionData) => api.post(`/forms/${formId}/questions`, { question: questionData });