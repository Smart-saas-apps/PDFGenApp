import React from 'react';
import { ElementToolbar } from './ElementToolbar';
import { StyleToolbar } from './StyleToolbar';

export const Toolbar: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <ElementToolbar />
      <StyleToolbar />
    </div>
  );
};