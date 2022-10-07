import { atom } from 'recoil';
import { UserType } from '../@types';

interface SignUpState {
  userType: UserType | null;
  email: string;
  password: string;
  name?: string;
  city?: string;
  address?: string;
  zipcode?: string;
}

export const signUpState = atom<SignUpState>({
  key: 'user',
  default: {
    userType: null,
    email: '',
    password: '',
    name: '',
    city: '',
    address: '',
    zipcode: '',
  },
});
