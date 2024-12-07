import React from 'react';
import Toolbar from './components/editor/Toolbar';
import { DesignCanvas } from './components/editor/DesignCanvas';
import { PDFPreview } from './components/editor/PDFPreview';
import { TemplateManager } from './components/editor/TemplateManager';
import { Card } from './components/ui/Card';
import './styles/resizable.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <h1 className="text-lg font-semibold text-gray-900">PDF Designer</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-45px)]">
        {/* Left Sidebar */}
        <div className="w-52 border-r border-gray-200 bg-white overflow-y-auto">
          <TemplateManager />
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="border-b border-gray-200 bg-white">
            <Toolbar />
          </div>

          {/* Canvas and Preview */}
          <div className="flex-1 flex overflow-hidden">
            {/* Canvas Area */}
            <div className="flex-1 overflow-auto bg-gray-100 p-8">
              <Card className="mx-auto" style={{ width: '800px', height: '1000px' }}>
                <DesignCanvas />
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="w-64 border-l border-gray-200 bg-white overflow-y-auto">
              <div className="p-3">
                <h2 className="text-sm font-medium text-gray-900 mb-3">Preview</h2>
                <PDFPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;