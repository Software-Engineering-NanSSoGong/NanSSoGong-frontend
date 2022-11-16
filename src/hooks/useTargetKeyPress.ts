import { useEffect, useState } from 'react';

function useTargetKeyPress(targetKey: string) {
  const [isTargetKeyPressed, setIsTargetKeyPress] = useState<boolean>(false);

  function downHandler({ key }: { key: string }): void {
    if (key === targetKey) {
      setIsTargetKeyPress(true);
    }
  }

  const upHandler = ({ key }: { key: string }): void => {
    if (key === targetKey) {
      setIsTargetKeyPress(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
  return { isTargetKeyPressed };
}

export default useTargetKeyPress;
