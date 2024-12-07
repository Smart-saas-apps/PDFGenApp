import { create } from 'zustand';
import { Template, TemplateElement } from '../types';

interface TemplateStore {
  templates: Template[];
  activeTemplate: Template & { selectedElementId?: string } | null;
  setActiveTemplate: (template: Template) => void;
  addElement: (element: TemplateElement) => void;
  updateElement: (elementId: string, updates: Partial<TemplateElement>) => void;
  removeElement: (elementId: string) => void;
  selectElement: (elementId: string) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  activeTemplate: null,
  setActiveTemplate: (template) => set({ activeTemplate: template }),
  addElement: (element) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: [...state.activeTemplate.elements, element],
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
          }
        : null,
    })),
  removeElement: (elementId) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            elements: state.activeTemplate.elements.filter((el) => el.id !== elementId),
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
}));