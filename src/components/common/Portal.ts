import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  id: string;
  position: React.CSSProperties['position'];
  top?: React.CSSProperties['top'];
  right?: React.CSSProperties['right'];
  bottom?: React.CSSProperties['bottom'];
  left?: React.CSSProperties['left'];
  align?: React.CSSProperties['justifyContent'];
}

function Portal({
  id,
  position,
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  align = 'center',
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
      justify-content: ${align};
      align-items: center;
    `;
    document.body.appendChild(newPortalElementInstance);

    return newPortalElementInstance;
  }, [align, bottom, id, left, position, right, top]);

  return ReactDOM.createPortal(children, portal);
}

export default Portal;
