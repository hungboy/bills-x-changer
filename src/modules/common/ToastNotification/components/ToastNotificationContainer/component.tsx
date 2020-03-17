import React from 'react';
import { PlacementType } from '../../types';

export const PLACEMENTS = {
  'bottom-right': { bottom: 0, right: 0 },
  'bottom-center': { bottom: 0, right: '50%', transform: 'translateX(50%)' },
  'bottom-left': { bottom: 0, left: 0 },
  'top-right': { top: 0, right: 0 },
  'top-center': { top: 0, right: '50%', transform: 'translateX(50%)' },
  'top-left': { top: 0, left: 0 }
};

export interface IToastNotificationContainerProps {
  placement: PlacementType;
  children?: React.ReactNode;
}

export const ToastNotificationContainer = ({
  placement,
  children
}: IToastNotificationContainerProps) => {
  return (
    <div
      className="toast-notifications_container"
      style={{
        position: 'fixed',
        boxSizing: 'border-box',
        zIndex: 1000,
        ...PLACEMENTS[placement]
      }}
    >
      {children}
    </div>
  );
};
