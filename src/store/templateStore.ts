import { create } from 'zustand';
import { Template, TemplateElement, ElementType } from '../types';

interface TemplateStore {
  templates: Template[];
  activeTemplate: Template & { selectedElementId?: string } | null;
  setActiveTemplate: (template: Template) => void;
  createTemplate: (name: string) => void;
  saveTemplate: () => void;
  addElement: (type: ElementType, defaultProps?: Partial<TemplateElement>) => void;
  updateElement: (elementId: string, updates: Partial<TemplateElement>) => void;
  removeElement: (elementId: string) => void;
  selectElement: (elementId: string) => void;
  duplicateElement: (elementId: string) => void;
  moveElement: (elementId: string, position: { x: number; y: number }) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  activeTemplate: null,
  
  setActiveTemplate: (template) => set({ activeTemplate: template }),
  
  createTemplate: (name) => set((state) => ({
    templates: [...state.templates, {
      id: crypto.randomUUID(),
      name,
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }],
  })),
  
  saveTemplate: () => set((state) => ({
    templates: state.activeTemplate
      ? state.templates.map((t) =>
          t.id === state.activeTemplate?.id
            ? { ...state.activeTemplate, updatedAt: new Date().toISOString() }
            : t
        )
      : state.templates,
  })),
  
  addElement: (type, defaultProps = {}) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: [
              ...state.activeTemplate.elements,
              {
                id: crypto.randomUUID(),
                type,
                content: '',
                position: {
                  x: 50,
                  y: 50,
                  width: 200,
                  height: type === 'text' ? 50 : 200,
                  rotation: 0,
                },
                style: {},
                ...defaultProps,
              },
            ],
          }
        : null,
    })),
    
  updateElement: (elementId, updates) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: state.activeTemplate.elements.map((el) =>
              el.id === elementId ? { ...el, ...updates } : el
            ),
            updatedAt: new Date().toISOString(),
          }
        : null,
    })),
    
  removeElement: (elementId) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: state.activeTemplate.elements.filter((el) => el.id !== elementId),
            selectedElementId: state.activeTemplate.selectedElementId === elementId
              ? undefined
              : state.activeTemplate.selectedElementId,
          }
        : null,
    })),
    
  selectElement: (elementId) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            selectedElementId: elementId,
          }
        : null,
    })),
    
  duplicateElement: (elementId) =>
    set((state) => {
      if (!state.activeTemplate) return state;
      
      const elementToDuplicate = state.activeTemplate.elements.find(
        (el) => el.id === elementId
      );
      
      if (!elementToDuplicate) return state;
      
      const newElement = {
        ...elementToDuplicate,
        id: crypto.randomUUID(),
        position: {
          ...elementToDuplicate.position,
          x: elementToDuplicate.position.x + 20,
          y: elementToDuplicate.position.y + 20,
        },
      };
      
      return {
        activeTemplate: {
          ...state.activeTemplate,
          elements: [...state.activeTemplate.elements, newElement],
        },
      };
    }),
    
  moveElement: (elementId, { x, y }) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: state.activeTemplate.elements.map((el) =>
              el.id === elementId
                ? {
                    ...el,
                    position: {
                      ...el.position,
                      x,
                      y,
                    },
                  }
                : el
            ),
          }
        : null,
    })),
}));