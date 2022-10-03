import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  id: string;
}

function Portal({ id, children }: React.PropsWithChildren<Props>) {
  const portal = React.useMemo(() => {
    const portalElement = document.getElementById(id);

    if (portalElement) {
      return portalElement;
    }

    const newPortalElementInstance = document.createElement('div');
    newPortalElementInstance.id = id;
    newPortalElementInstance.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
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
