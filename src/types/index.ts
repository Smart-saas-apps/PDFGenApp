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
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  opacity?: number;
  transform?: string;
  [key: string]: any;
}

export interface BaseTemplateElement {
  id: string;
  type: string;
  position: Position;
  size: Size;
  style: ElementStyle;
  content: string;
  zIndex?: number;
}

export interface TextElement extends BaseTemplateElement {
  type: 'text';
}

export interface ImageElement extends BaseTemplateElement {
  type: 'image';
  alt?: string;
}

export interface ShapeElement extends BaseTemplateElement {
  type: 'shape';
  shape: 'rectangle' | 'circle';
  backgroundColor?: string;
}

export type TemplateElement = TextElement | ImageElement | ShapeElement;

export interface Template {
  id: string;
  name: string;
  elements: TemplateElement[];
  createdAt: number;
  updatedAt: number;
}