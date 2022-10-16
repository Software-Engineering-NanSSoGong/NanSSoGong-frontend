import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { Button } from '../common';
import { useModal } from './Context';

interface Props extends ComponentPropsWithoutRef<'button'> {
  modalType: 'open' | 'close';
  as?: ElementType;
}

function ModalTriggerButton({
  modalType,
  as,
  onClick,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const { open, close } = useModal();
  const WillRenderComponent = as || Button;

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
    <WillRenderComponent as={as} {...props} onClick={handleClick}>
      {children}
    </WillRenderComponent>
  );
}

export default ModalTriggerButton;
