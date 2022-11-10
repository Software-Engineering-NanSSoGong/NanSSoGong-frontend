import { Address, Dinner, Food, History, Style } from './common';

export interface BaseAPIResponse<T> {
  status: number;
  data: T;
}

export interface BasePageRequest {
  page?: number;
  size?: number;
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

// Order Service
export interface ResponseOrderHistoryList extends BasePageResponse<History> {}

// User Service
export interface RequestSignUpInfo {
  name: string;
  email: string;
  password: string;
  personalInformationCollectionAgreement?: boolean;
  cardNumber?: string;
  address?: Address;
}
type SuccessResponseSignUpInfo = {
  name: string;
};
type FailResponseSignUpInfo = {
  exceptionName: string;
  exceptionType: string;
  message: string;
};

export type ResponseSignUpInfo = SuccessResponseSignUpInfo | FailResponseSignUpInfo;
