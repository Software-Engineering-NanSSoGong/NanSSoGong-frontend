import { Address, Dinner, Food, History, Ingredient, OrderStatus, Style } from './common';
import { GRADE } from './User';

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

export interface BaseRequestId {
  id: number;
}

export interface BaseFailResponse {
  exceptionName: string;
  exceptionType: string;
  message: string;
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
export interface RequestModifyOrderInfo {
  orderId: number;
  orderSheetUpdateRequestList: {
    orderSheetId: number;
    styleId: number;
    dinnerId: number;
    foodIdAndDifference: Record<string, number>;
  }[];
}
export interface RequestChangeOrderStatus {
  orderId: number;
  orderStatus: OrderStatus;
}

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

export type ResponseSignUpInfo = SuccessResponseSignUpInfo | BaseFailResponse;

export interface RequestLogInInfo {
  email: string;
  password: string;
}
export interface ResponseClientInfo {
  id: number;
  name: string;
  loginId: string;
  password: string;
  cardNumber: string;
  clientGrade: GRADE;
  address: Address;
  enable: true;
}

export interface UpdateClientInfo {
  id : number;
  personalInformationCollectionAgreement?: boolean;
  cardNumber?: string;
  address?: Address;
}

// Ingredient Service
export interface ResponseIngredientList extends BasePageResponse<Ingredient> {}
