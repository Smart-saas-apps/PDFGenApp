import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import { PlusIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export const TemplateManager: React.FC = () => {
  const { templates, createTemplate, setActiveTemplate } = useTemplateStore();
  const [newTemplateName, setNewTemplateName] = useState('');

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTemplateName.trim()) {
      createTemplate(newTemplateName.trim());
      setNewTemplateName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTemplate(e);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Templates</h2>
        <form onSubmit={handleCreateTemplate} className="space-y-2">
          <input
            type="text"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter template name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <Button
            type="submit"
            disabled={!newTemplateName.trim()}
            icon={<PlusIcon className="w-5 h-5" />}
            className="w-full justify-center"
          >
            Create Template
          </Button>
        </form>
      </div>

      {/* Template List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {templates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No templates yet.</p>
            <p className="text-sm">Create your first template above!</p>
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="group flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setActiveTemplate(template)}
            >
              <div>
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(template.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<DocumentDuplicateIcon className="w-5 h-5" />}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement template duplication
                }}
              >
                Duplicate
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
