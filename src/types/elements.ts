export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
};

export type ElementStyle = {
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  padding?: string;
};

export type ElementType = 'text' | 'image' | 'shape' | 'table';

export interface TemplateElement {
  id: string;
  type: ElementType;
  content: string;
  position: Position;
  style: ElementStyle;
}

export interface TableData {
  rows: number;
  columns: number;
  data: string[][];
}

export interface Template {
  id: string;
  name: string;
  elements: TemplateElement[];
  createdAt: string;
  updatedAt: string;
}
