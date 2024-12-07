import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentIcon,
  FolderIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-16 bg-white border-r border-gray-200">
        <div className="flex flex-col items-center h-full py-4">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center">
              <DocumentIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-4">
            <Link
              to="/"
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <DocumentIcon className="w-6 h-6" />
            </Link>
            <Link
              to="/templates"
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <FolderIcon className="w-6 h-6" />
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="mt-auto space-y-4">
            <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              <Cog6ToothIcon className="w-6 h-6" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-16">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <h1 className="text-xl font-semibold text-gray-900">PDF Generator</h1>
          <div className="ml-auto flex items-center space-x-4">
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              New Template
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
