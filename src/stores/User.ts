import { atom, selector } from 'recoil';

export interface LoginedUser {
  memberId: number;
  memberType: string;
  sessionId: string;
}

export const userState = atom<LoginedUser>({
  key: 'user',
  default: {
    memberId: -1,
    memberType: '',
    sessionId: '',
  },
});

export const isAuth = selector<boolean>({
  key: 'isAuth',
  get: ({ get }) => {
    const { memberId } = get(userState);
    return !!memberId;
  },
});
