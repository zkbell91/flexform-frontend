import React, { useState } from 'react';
import Header from './components/Header';
import FormList from './components/FormList';
import FormDetail from './components/FormDetail';
import FormBuilder from './components/FormBuilder';

function App() {
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [isFormBuilderVisible, setFormBuilderVisible] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFormBuilderVisible ? (
          <FormBuilder />
        ) : selectedFormId ? (
          <FormDetail formId={selectedFormId} onBack={() => setSelectedFormId(null)} />
        ) : (
          <FormList onSelectForm={setSelectedFormId} />
        )}
        <button 
          onClick={() => setFormBuilderVisible(!isFormBuilderVisible)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isFormBuilderVisible ? 'Back to Forms' : 'Open Form Builder'}
        </button>
      </main>
    </div>
  );
}

export default App;