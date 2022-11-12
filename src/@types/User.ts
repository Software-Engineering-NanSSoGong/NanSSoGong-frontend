export type UserType = 'client' | 'employee' | 'rider';

export const GRADE_INFO = {
  BRONZE: {
    clientGradeName: 'BRONZE',
    cut: 0,
    saleRate: 0,
  },
  GOLD: {
    clientGradeName: 'GOLD',
    cut: 1,
    saleRate: 3,
  },
  DIAMOND: {
    clientGradeName: 'DIAMOND',
    cut: 3,
    saleRate: 5,
  },
  CHALLENGER: {
    clientGradeName: 'CHALLENGER',
    cut: 5,
    saleRate: 10,
  },
} as const;

export type GRADE = keyof typeof GRADE_INFO;

