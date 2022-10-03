import React from 'react';

interface Props {
  initialState: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const useDisclosure = ({ initialState, onOpen = undefined, onClose = undefined }: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);

  const open = async () => {
    setIsOpen(true);
    if (typeof onOpen !== 'undefined') {
      await onOpen();
    }
  };

  const close = async () => {
    setIsOpen(false);
    if (typeof onClose !== 'undefined') {
      await onClose();
    }
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};

export default useDisclosure;
