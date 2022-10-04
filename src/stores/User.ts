import { atom, selector } from 'recoil';

interface User {
  token?: string;
}

export const userState = atom<User>({
  key: 'user',
  default: {
    token: '',
  },
});

export const isAuth = selector<boolean>({
  key: 'isAuth',
  get: ({ get }) => {
    const { token } = get(userState);
    return !!token;
  },
});
