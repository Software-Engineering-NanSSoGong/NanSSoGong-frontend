import { OrderStatus } from '../@types';
import { ChipType } from '../components/common/Chip';

export const convertToChipTypeFromOrderStatus: (orderStatus: OrderStatus) => ChipType = (
  orderStatus: OrderStatus,
) => {
  switch (orderStatus) {
    case 'ORDERED':
    case 'RESERVED':
      return 'warning';
    case 'COOKED':
    case 'ACCEPTED':
      return 'primary';
    case 'DELIVERING':
      return 'success';
    case 'DELIVERED':
    case 'DENIED':
    case 'CANCEL':
      return 'danger';
    default:
      return 'primary';
  }
};
