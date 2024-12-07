import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DesignCanvas } from './components/editor/DesignCanvas';
import { Toolbar } from './components/editor/Toolbar';
import { PDFPreview } from './components/editor/PDFPreview';
import { TemplateManager } from './components/editor/TemplateManager';
import { Layout } from './components/layout/Layout';
import { Card } from './components/ui/Card';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <Card noPadding>
                  <Toolbar />
                </Card>
                
                <div className="flex gap-6">
                  <div className="w-64">
                    <Card noPadding>
                      <TemplateManager />
                    </Card>
                  </div>
                  
                  <div className="flex-1">
                    <Card className="pdf-canvas" noPadding>
                      <DesignCanvas />
                    </Card>
                  </div>
                  
                  <Card noPadding>
                    <PDFPreview />
                  </Card>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;