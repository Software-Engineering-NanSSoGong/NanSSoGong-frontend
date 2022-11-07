import { Dinner, Food, Style } from './common';

export interface BaseAPIResponse<T> {
  status: number;
  data: T;
}

export interface BasePageRequest {
  page?: string;
  size?: string;
}

export interface BasePageResponse<T> {
  content: T[];
  pageable: {
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface BaseRequsetId {
  id: number;
}

/** Dinner Service */
export interface ResponseDinnerList extends BasePageResponse<Dinner> {}
export interface ResponseDinnerItem extends Dinner {}

// Style Service
export interface ResponseStyleList extends BasePageResponse<Style> {}

// Food Service
export interface ResponseFoodList extends BasePageResponse<Food> {}