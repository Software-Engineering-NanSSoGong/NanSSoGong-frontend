import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';
import { Button } from '../common';
import { useToast } from './Context';

interface Props extends ComponentPropsWithoutRef<'button'> {
  toastType: 'show' | 'close';
  as?: ElementType;
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
}

function ToastTriggerButton({
  toastType,
  as,
  buttonProps,
  onClick,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const { show, close } = useToast();
  const WillRenderComponent = as || Button;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (toastType === 'show') {
      show();
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

export default ToastTriggerButton;
