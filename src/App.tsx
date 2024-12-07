import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DesignCanvas } from './components/editor/DesignCanvas';
import { Toolbar } from './components/editor/Toolbar';
import { PDFPreview } from './components/editor/PDFPreview';
import { TemplateManager } from './components/editor/TemplateManager';
import { Card } from './components/ui/Card';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <Card>
                  <Toolbar />
                </Card>
                
                <div className="flex gap-6">
                  <div className="w-64">
                    <Card>
                      <TemplateManager />
                    </Card>
                  </div>
                  
                  <div className="flex-1">
                    <Card className="pdf-canvas">
                      <DesignCanvas />
                    </Card>
                  </div>
                  
                  <div className="w-80">
                    <Card>
                      <PDFPreview />
                    </Card>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;