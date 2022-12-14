import styled from '@emotion/styled';
import React from 'react';

import { useDisclosure } from '../../hooks';
import { theme } from '../../styles';
import { Portal } from '../common';
import AskModal from './AskModal';
import Choice3Modal from './Choice3Modal';
import ConfirmModal from './ConfirmModal';
import Context from './Context';
import ModalTriggerButton from './ModalTriggerButton';

type UseDisclosure = typeof useDisclosure;

interface Props {
  triggerNode: React.ReactNode;
  modalNode: React.ReactNode;
  initialIsOpen?: Parameters<UseDisclosure>[0]['initialState'];
  onOpen?: Parameters<UseDisclosure>[0]['onOpen'];
  onClose?: Parameters<UseDisclosure>[0]['onClose'];
}

function Modal({ modalNode, triggerNode, initialIsOpen = false, onOpen, onClose }: Props) {
  const portalId = React.useMemo(() => `portal-${new Date().getTime()}`, []);

  const { isOpen, close, open } = useDisclosure({
    initialState: initialIsOpen,
    onOpen,
    onClose: () => {
      if (typeof onClose !== 'undefined') {
        onClose();
      }
      document.getElementById(portalId)?.remove();
    },
  });

  return (
    <Context.Provider value={{ open, close }}>
      {triggerNode}
      {isOpen ? (
        <Portal id={portalId} position='fixed'>
          <ModalBackground
            onClick={() => {
              if (typeof onClose !== 'undefined') {
                onClose();
              }
              close();
            }}
          />
          <ModalNode>{modalNode}</ModalNode>
        </Portal>
      ) : null}
    </Context.Provider>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: ${theme.palette.black};
  opacity: 0.7;
  z-index: 9995;
`;

const ModalNode = styled.section`
  width: 100%;
  max-width: 500px;
  background-color: ${theme.palette.gray50};
  z-index: 9999;
  border-radius: 16px;
`;

Modal.triggerButton = ModalTriggerButton;
Modal.askModal = AskModal;
Modal.confirmModal = ConfirmModal;
Modal.choice3Modal = Choice3Modal;

export default Modal;
