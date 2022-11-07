import { Dinner, Style } from './common';

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

/** Dinner Service */

export interface RequestDinnerList extends BasePageRequest {}
export interface ResponseDinnerList extends BasePageResponse<Dinner> {}

export interface ResponseStyleList extends BasePageResponse<Style> {}
