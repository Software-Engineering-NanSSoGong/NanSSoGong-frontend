import { useContext, createContext } from 'react';

interface InitialState {
  open: () => void;
  close: () => void;
}

const Context = createContext({} as InitialState);
export default Context;

export const useModal = () => useContext(Context);
