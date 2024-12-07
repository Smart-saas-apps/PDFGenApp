export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  elements: TemplateElement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'table';
  content: string;
  style: ElementStyle;
  position: Position;
}

export interface ElementStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}