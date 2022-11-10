import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import { useDisclosure } from '../../hooks';
import { theme } from '../../styles';
import { PalleteValueType } from '../../styles/theme/colors';
import { Portal } from '../common';
import Context from './Context';
import ToastTriggerButton from './ToastTriggerButton';

interface Props {
  triggerNode: ReactNode;
  toastNode: ReactNode;
  backgroundColor?: PalleteValueType;
  top?: CSSProperties['top'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
  align?: CSSProperties['justifyContent'];
  duration?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

function Toast({
  triggerNode,
  toastNode,
  duration = 3000,
  backgroundColor = theme.palette.yellow200,
  top = 'auto',
  right = 'auto',
  bottom = 'auto',
  left = 'auto',
  align = 'end',
  onOpen,
  onClose,
}: Props) {
  const portalId = useMemo(() => `portal-${new Date().getTime()}`, []);

  const {
    isOpen,
    close,
    open: show,
  } = useDisclosure({
    initialState: false,
    onOpen,
    onClose: () => {
      if (typeof onClose !== 'undefined') {
        onClose();
      }
      document.getElementById(portalId)?.remove();
    },
  });

  useEffect(() => {
    if (!duration || !isOpen) {
      return;
    }
    const timeoutId = setTimeout(() => {
      if (onClose) {
        onClose();
      }
      close();
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [close, duration, isOpen, onClose]);

  // 해당 부분을 없애면, Toast가 나올 때 스크롤이 생겼다가 사라짐
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Context.Provider value={{ show, close }}>
      {triggerNode}
      {isOpen && (
        <Portal
          id={portalId}
          position={'initial'}
          top={top}
          right={right}
          bottom={'16px'}
          left={left}
          align={align}
        >
          <motion.div
            key={portalId}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            role='status'
            style={{ width: '100%' }}
          >
            <ToastNode
              top={top}
              left={left}
              bottom={bottom}
              right={right}
              backgroundColor={backgroundColor}
            >
              {toastNode}
            </ToastNode>
          </motion.div>
        </Portal>
      )}
    </Context.Provider>
  );
}

type StyleProps = Pick<Props, 'top' | 'right' | 'bottom' | 'left' | 'backgroundColor'>;

const ToastNode = styled.div<StyleProps>`
  width: 100%;
  bottom: 30px;
  max-width: 500px;
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  background-color: ${(props) => props.backgroundColor};
  z-index: 9999;
  border-radius: 16px;
  transform: translateX(-50%);
`;

Toast.triggerButton = ToastTriggerButton;

export default Toast;
