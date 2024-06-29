import api from './api';

export const getForms = () => api.get('/forms');
export const getForm = (id) => api.get(`/forms/${id}`);
export const getQuestions = (formId) => api.get(`/forms/${formId}/questions`);