import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Template, TemplateElement, TextElement, ImageElement, ShapeElement } from '../types';

type NewElement = 
  | Omit<TextElement, 'id'>
  | Omit<ImageElement, 'id'>
  | Omit<ShapeElement, 'id'>;

interface TemplateStore {
  templates: Template[];
  activeTemplate: Template | null;
  selectedElementId: string | null;
  createTemplate: (name: string) => void;
  setActiveTemplate: (template: Template) => void;
  addElement: (element: NewElement) => void;
  updateElement: (elementId: string, updates: Partial<TemplateElement>) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElementId: (elementId: string | null) => void;
}

const createNewElement = (element: NewElement): TemplateElement => {
  const baseElement = {
    ...element,
    id: uuidv4(),
  };

  switch (element.type) {
    case 'text':
      return {
        ...baseElement,
        type: 'text',
      } as TextElement;
    case 'image':
      return {
        ...baseElement,
        type: 'image',
      } as ImageElement;
    case 'shape':
      return {
        ...baseElement,
        type: 'shape',
      } as ShapeElement;
    default:
      throw new Error(`Unknown element type: ${(element as any).type}`);
  }
};

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  activeTemplate: null,
  selectedElementId: null,

  createTemplate: (name: string) => {
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

  setActiveTemplate: (template: Template) => {
    set({ activeTemplate: template });
  },

  addElement: (element: NewElement) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const newElement = createNewElement(element);

      const updatedTemplate: Template = {
        ...state.activeTemplate,
        elements: [...state.activeTemplate.elements, newElement],
        updatedAt: Date.now(),
      };

      return {
        ...state,
        activeTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    });
  },

  updateElement: (elementId: string, updates: Partial<TemplateElement>) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const updatedTemplate: Template = {
        ...state.activeTemplate,
        elements: state.activeTemplate.elements.map((element) => {
          if (element.id !== elementId) return element;

          const updatedElement = { ...element, ...updates };
          switch (updatedElement.type) {
            case 'text':
              return updatedElement as TextElement;
            case 'image':
              return updatedElement as ImageElement;
            case 'shape':
              return updatedElement as ShapeElement;
            default:
              return element;
          }
        }),
        updatedAt: Date.now(),
      };

      return {
        ...state,
        activeTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    });
  },

  deleteElement: (elementId: string) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const updatedTemplate: Template = {
        ...state.activeTemplate,
        elements: state.activeTemplate.elements.filter(
          (element) => element.id !== elementId
        ),
        updatedAt: Date.now(),
      };

      return {
        ...state,
        activeTemplate: updatedTemplate,
        templates: state.templates.map((t) =>
          t.id === updatedTemplate.id ? updatedTemplate : t
        ),
      };
    });
  },

  setSelectedElementId: (elementId: string | null) => {
    set({ selectedElementId: elementId });
  },
}));