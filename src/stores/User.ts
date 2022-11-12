import { atom, selector } from 'recoil';

export interface LoginedUser {
  memberId: number | null;
  memberType: string;
  sessionId: string;
}

export const userState = atom<LoginedUser>({
  key: 'user',
  default: {
    memberId: null,
    memberType: '',
    sessionId: '',
  },
});

export const isAuth = selector({
  key: 'isAuth',
  get: ({ get }) => {
    const { memberId } = get(userState);
    return { isLogin: !!memberId, id: memberId };
  },
});
