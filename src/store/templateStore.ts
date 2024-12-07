import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Template, TemplateElement, ElementType, Position, Size } from '../types';

interface TemplateStore {
  templates: Template[];
  activeTemplate: Template | null;
  selectedElementId: string | null;
  createTemplate: (name: string) => void;
  addElement: (type: ElementType, props?: Partial<TemplateElement>) => void;
  updateElement: (elementId: string, updates: Partial<TemplateElement>) => void;
  moveElement: (elementId: string, position: Position) => void;
  resizeElement: (elementId: string, size: Size) => void;
  duplicateElement: (elementId: string) => void;
  removeElement: (elementId: string) => void;
  setSelectedElementId: (elementId: string | null) => void;
}

const createDefaultElement = (type: ElementType, props: Partial<TemplateElement> = {}): TemplateElement => {
  const defaultSizes: Record<ElementType, Size> = {
    text: { width: 200, height: 50 },
    image: { width: 200, height: 200 },
    shape: { width: 100, height: 100 },
    table: { width: 400, height: 200 },
  };

  return {
    id: uuidv4(),
    type,
    position: { x: 50, y: 50 },
    size: defaultSizes[type],
    content: '',
    style: {},
    ...props,
  };
};

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  activeTemplate: null,
  selectedElementId: null,

  createTemplate: (name) => {
    const now = new Date().toISOString();
    const newTemplate: Template = {
      id: uuidv4(),
      name,
      description: '',
      elements: [],
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      templates: [...state.templates, newTemplate],
      activeTemplate: newTemplate,
    }));
  },

  addElement: (type, props = {}) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const newElement = createDefaultElement(type, props);
      const now = new Date().toISOString();

      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: [...state.activeTemplate.elements, newElement],
          updatedAt: now,
        },
      };
    });
  },

  updateElement: (elementId, updates) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const now = new Date().toISOString();
      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: state.activeTemplate.elements.map((element) =>
            element.id === elementId ? { ...element, ...updates } : element
          ),
          updatedAt: now,
        },
      };
    });
  },

  moveElement: (elementId, position) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const now = new Date().toISOString();
      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: state.activeTemplate.elements.map((element) =>
            element.id === elementId ? { ...element, position } : element
          ),
          updatedAt: now,
        },
      };
    });
  },

  resizeElement: (elementId, size) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const now = new Date().toISOString();
      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: state.activeTemplate.elements.map((element) =>
            element.id === elementId ? { ...element, size } : element
          ),
          updatedAt: now,
        },
      };
    });
  },

  duplicateElement: (elementId) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const elementToDuplicate = state.activeTemplate.elements.find(
        (element) => element.id === elementId
      );

      if (!elementToDuplicate) return state;

      const newElement = {
        ...elementToDuplicate,
        id: uuidv4(),
        position: {
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20,
        },
      };

      const now = new Date().toISOString();
      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: [...state.activeTemplate.elements, newElement],
          updatedAt: now,
        },
      };
    });
  },

  removeElement: (elementId) => {
    set((state) => {
      if (!state.activeTemplate) return state;

      const now = new Date().toISOString();
      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: state.activeTemplate.elements.filter(
            (element) => element.id !== elementId
          ),
          updatedAt: now,
        },
        selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
      };
    });
  },

  setSelectedElementId: (elementId) => {
    set({ selectedElementId: elementId });
  },
}));