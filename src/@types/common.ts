export interface BaseFood<T> {
  name: T;
  price: number;
  quantity?: number;
}

export type StyleName = 'simple' | 'deluxe' | 'grande';

export interface Style extends BaseFood<StyleName> {}

export interface Dinner extends BaseFood<string> {
  image: string;
  description: string;
  styles: Style[];
}

export interface Food extends BaseFood<string> {
  type: 'meat' | 'rice' | 'drink';
}

export interface AddedDinner extends Dinner {
  selectedStyle: Style;
}
