import React, { useState } from 'react';
import Header from './components/Header';
import FormList from './components/FormList';
import FormDetail from './components/FormDetail';

function App() {
  const [selectedFormId, setSelectedFormId] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedFormId ? (
          <FormDetail formId={selectedFormId} onBack={() => setSelectedFormId(null)} />
        ) : (
          <FormList onSelectForm={setSelectedFormId} />
        )}
      </main>
    </div>
  );
}

export default App;