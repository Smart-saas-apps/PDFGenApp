import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DesignCanvas } from './components/editor/DesignCanvas';
import { Toolbar } from './components/editor/Toolbar';
import { PDFPreview } from './components/editor/PDFPreview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">PDF Generation Platform</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  <Toolbar />
                  <div className="flex gap-6">
                    <DesignCanvas />
                    <PDFPreview />
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;