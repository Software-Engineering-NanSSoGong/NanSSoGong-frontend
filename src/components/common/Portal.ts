import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  id: string;
  position: CSSProperties['position'];
  top?: CSSProperties['top'];
  right?: CSSProperties['right'];
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
}

function Portal({
  id,
  position,
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  children,
}: React.PropsWithChildren<Props>) {
  const portal = React.useMemo(() => {
    const portalElement = document.getElementById(id);

    if (portalElement) {
      return portalElement;
    }

    const newPortalElementInstance = document.createElement('div');
    newPortalElementInstance.id = id;
    newPortalElementInstance.style.cssText = `
      position: ${position};
      top: ${top};
      right: ${right};
      bottom: ${bottom};
      left: ${left};
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;
    document.body.appendChild(newPortalElementInstance);

    return newPortalElementInstance;
  }, [id]);

  return ReactDOM.createPortal(children, portal);
}

export default Portal;
