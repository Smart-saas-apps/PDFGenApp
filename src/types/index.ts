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

export interface BaseElement {
  id: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  style: Record<string, any>;
  zIndex?: number;
}

export interface BaseNewElement {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  style: Record<string, any>;
  zIndex?: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  content: string;
  alt?: string;
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shape: 'rectangle' | 'circle';
  content: string;
  backgroundColor?: string;
}

export interface TableElement extends BaseElement {
  type: 'table';
  content: string[][];
}

export interface QRCodeElement extends BaseElement {
  type: 'qrcode';
  content: string;
}

export interface ListElement extends BaseElement {
  type: 'list';
  content: string[];
}

export type TemplateElement =
  | TextElement
  | ImageElement
  | ShapeElement
  | TableElement
  | QRCodeElement
  | ListElement;

export interface NewTextElement extends BaseNewElement {
  type: 'text';
  content: string;
}

export interface NewImageElement extends BaseNewElement {
  type: 'image';
  content: string;
  alt?: string;
}

export interface NewShapeElement extends BaseNewElement {
  type: 'shape';
  shape: 'rectangle' | 'circle';
  content: string;
  backgroundColor?: string;
}

export interface NewTableElement extends BaseNewElement {
  type: 'table';
  content: string[][];
}

export interface NewQRCodeElement extends BaseNewElement {
  type: 'qrcode';
  content: string;
}

export interface NewListElement extends BaseNewElement {
  type: 'list';
  content: string[];
}

export type NewElement =
  | NewTextElement
  | NewImageElement
  | NewShapeElement
  | NewTableElement
  | NewQRCodeElement
  | NewListElement;

export interface Template {
  id: string;
  name: string;
  elements: TemplateElement[];
  createdAt?: number;
  updatedAt?: number;
}