import { useEffect } from 'react';
import { useModal } from '../components/modal/Context';
import useTargetKeyPress from './useTargetKeyPress';

interface Props {
  onClickConfirm?: () => void;
}

function useDetectModalKeyPress({ onClickConfirm }: Props) {
  const { isTargetKeyPressed: isEnterKeyPressed } = useTargetKeyPress('Enter');
  const { isTargetKeyPressed: isESCKeyPressed } = useTargetKeyPress('Escape');
  const { close } = useModal();

  useEffect(() => {
    if (isEnterKeyPressed) {
      if (typeof onClickConfirm !== 'undefined') {
        onClickConfirm();
      }
      close();
    }
    if (isESCKeyPressed) {
      close();
    }
  }, [close, isESCKeyPressed, isEnterKeyPressed, onClickConfirm]);
}

export default useDetectModalKeyPress;
