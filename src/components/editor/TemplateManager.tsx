import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import {
  PlusIcon,
  DocumentIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export const TemplateManager: React.FC = () => {
  const { templates, createTemplate, setActiveTemplate } = useTemplateStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  const handleCreateTemplate = () => {
    if (newTemplateName.trim()) {
      createTemplate(newTemplateName.trim());
      setNewTemplateName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Templates</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Template
        </button>
      </div>

      {isCreating && (
        <div className="p-4 border-b bg-gray-50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="Template name"
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleCreateTemplate}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        {templates.length === 0 ? (
          <p className="text-gray-500 text-center">No templates yet</p>
        ) : (
          <ul className="space-y-2">
            {templates.map((template) => (
              <li
                key={template.id}
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => setActiveTemplate(template)}
              >
                <div className="flex items-center space-x-3">
                  <DocumentIcon className="w-5 h-5 text-gray-500" />
                  <span>{template.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add edit functionality
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add delete functionality
                    }}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
