import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { 
  Template, 
  TemplateElement, 
  NewElement,
  TextElement,
  ImageElement,
  ShapeElement,
  TableElement,
  QRCodeElement,
  ListElement
} from '../types';

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
    id: uuidv4(),
    position: element.position,
    size: element.size,
    style: element.style,
    zIndex: element.zIndex,
  };

  switch (element.type) {
    case 'text':
      return {
        ...baseElement,
        type: 'text',
        content: element.content,
      } as TextElement;
    case 'image':
      return {
        ...baseElement,
        type: 'image',
        content: element.content,
        alt: element.alt,
      } as ImageElement;
    case 'shape':
      return {
        ...baseElement,
        type: 'shape',
        shape: element.shape,
        content: element.content,
        backgroundColor: element.backgroundColor,
      } as ShapeElement;
    case 'table':
      return {
        ...baseElement,
        type: 'table',
        content: element.content,
      } as TableElement;
    case 'qrcode':
      return {
        ...baseElement,
        type: 'qrcode',
        content: element.content,
      } as QRCodeElement;
    case 'list':
      return {
        ...baseElement,
        type: 'list',
        content: element.content,
      } as ListElement;
    default:
      throw new Error(`Unknown element type: ${(element as any).type}`);
  }
};

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

  updateElement: (elementId, updates) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const updatedTemplate: Template = {
        ...state.activeTemplate,
        elements: state.activeTemplate.elements.map((element) => {
          if (element.id !== elementId) return element;
          return { ...element, ...updates } as TemplateElement;
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

  deleteElement: (elementId) => {
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
        selectedElementId: null,
      };
    });
  },

  setSelectedElementId: (elementId) => {
    set({ selectedElementId: elementId });
  },
}));