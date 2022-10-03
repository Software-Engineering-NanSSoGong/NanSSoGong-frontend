import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { useModal } from './Context';

interface Props extends ComponentPropsWithoutRef<'button'> {
  modalType: 'open' | 'close';
}

function ModalTriggerButton({ modalType, onClick, children, ...props }: PropsWithChildren<Props>) {
  const { open, close } = useModal();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (modalType === 'open') {
      open();
    } else {
      close();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}

export default ModalTriggerButton;
