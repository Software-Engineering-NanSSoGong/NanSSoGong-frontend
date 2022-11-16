import { atom, selector } from 'recoil';

export interface LoginedUser {
  memberId: number | null;
  memberType: 'loginClient' | 'loginChef' | 'loginRider' | 'guest';
  sessionId: string;
  uuid: string | null;
}

export const userState = atom<LoginedUser>({
  key: 'user',
  default: {
    memberId: null,
    memberType: 'guest',
    sessionId: '',
    uuid: null,
  },
});

export const isAuth = selector({
  key: 'isAuth',
  get: ({ get }) => {
    const { memberId } = get(userState);
    return { isLogin: !!memberId, id: memberId };
  },
});
