import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Template, TemplateElement } from '../types';

interface TemplateStore {
  templates: Template[];
  activeTemplate: Template | null;
  selectedElementId: string | null;
  createTemplate: (name: string) => void;
  setActiveTemplate: (template: Template) => void;
  addElement: (element: Omit<TemplateElement, 'id'>) => void;
  updateElement: (elementId: string, updates: Partial<TemplateElement>) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElementId: (elementId: string | null) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  activeTemplate: null,
  selectedElementId: null,

  createTemplate: (name) => {
    const newTemplate: Template = {
      id: uuidv4(),
      name,
      elements: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    set((state) => ({
      templates: [...state.templates, newTemplate],
      activeTemplate: newTemplate,
    }));
  },

  setActiveTemplate: (template) => {
    set({ activeTemplate: template });
  },

  addElement: (element) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const newElement = {
        ...element,
        id: uuidv4(),
      };

      const updatedTemplate = {
        ...state.activeTemplate,
        elements: [...state.activeTemplate.elements, newElement],
        updatedAt: Date.now(),
      };

      return {
        activeTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    });
  },

  updateElement: (elementId, updates) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const updatedTemplate = {
        ...state.activeTemplate,
        elements: state.activeTemplate.elements.map((element) =>
          element.id === elementId ? { ...element, ...updates } : element
        ),
        updatedAt: Date.now(),
      };

      return {
        activeTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    });
  },

  deleteElement: (elementId) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const updatedTemplate = {
        ...state.activeTemplate,
        elements: state.activeTemplate.elements.filter((e) => e.id !== elementId),
        updatedAt: Date.now(),
      };

      return {
        activeTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    });
  },

  setSelectedElementId: (elementId) => {
    set({ selectedElementId: elementId });
  },
}));