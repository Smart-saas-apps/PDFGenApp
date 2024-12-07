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

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-base font-medium mb-4">Templates</h2>
        <form onSubmit={handleCreateTemplate}>
          <div className="relative">
            <input
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="Template name"
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!newTemplateName.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <PlusIcon className="w-5 h-5 text-gray-400 hover:text-blue-500" />
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="space-y-2">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setActiveTemplate(template)}
              className="group flex items-center justify-between p-3 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {template.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(template.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Implement template duplication
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100"
              >
                <DocumentDuplicateIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ))}

          {templates.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">No templates yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
