export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ElementStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  opacity?: number;
  rotate?: number;
}

export type ElementType = 'text' | 'image' | 'shape' | 'table';

export interface TemplateElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  content: string;
  style: ElementStyle;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  elements: TemplateElement[];
  createdAt: string;
  updatedAt: string;
}