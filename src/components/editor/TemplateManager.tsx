import React, { useState } from 'react';
import { useTemplateStore } from '../../store/templateStore';
import { Button } from '../ui/Button';
import { PlusIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export const TemplateManager: React.FC = () => {
  const { templates, createTemplate } = useTemplateStore();
  const [newTemplateName, setNewTemplateName] = useState('');

  const handleCreateTemplate = () => {
    if (newTemplateName.trim()) {
      createTemplate(newTemplateName.trim());
      setNewTemplateName('');
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Templates</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            placeholder="New template name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          <Button
            onClick={handleCreateTemplate}
            icon={<PlusIcon className="w-5 h-5" />}
          >
            Create
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500">
                Created {new Date(template.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              icon={<DocumentDuplicateIcon className="w-5 h-5" />}
            >
              Use
            </Button>
          </div>
        ))}

        {templates.length === 0 && (
          <div className="text-center py-8">
            <DocumentDuplicateIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No templates</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new template
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
