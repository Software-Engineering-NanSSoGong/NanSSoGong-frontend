import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { Button } from '../common';
import { useModal } from './Context';

interface Props extends ComponentPropsWithoutRef<'button'> {
  modalType: 'open' | 'close';
  as?: ElementType;
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
}

function ModalTriggerButton({
  modalType,
  as,
  buttonProps,
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
    <WillRenderComponent {...buttonProps} as={as} {...props} onClick={handleClick}>
      {children}
    </WillRenderComponent>
  );
}

export default ModalTriggerButton;
