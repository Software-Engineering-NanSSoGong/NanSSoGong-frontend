import React from 'react';

interface Props {
  initialState: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const useDisclosure = ({ initialState, onOpen, onClose }: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);

  const open = () => {
    setIsOpen(true);
    if (typeof onOpen !== 'undefined') {
      onOpen();
    }
  };

  const close = () => {
    setIsOpen(false);
    if (typeof onClose !== 'undefined') {
      onClose();
    }
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};

export default useDisclosure;
