import { useContext, createContext } from 'react';

interface InitialState {
  open: () => Promise<void>;
  close: () => Promise<void>;
}

const Context = createContext({} as InitialState);
export default Context;

export const useModal = () => useContext(Context);
