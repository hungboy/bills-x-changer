import React, { useState, createContext, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ToastNotificationContainer, Toast } from '..';
import {
  ToastId,
  GenerateContentsFunction,
  PlacementType,
  AddToastFunction,
  RemoveToastFunction,
  RemoveAllToastsFunction,
  UpdateToastStateFunction,
  ToastNotificationMap,
  ToastState,
  ToastVariant
} from '../../types';

export const ToastNotificationContext = createContext<IToastNotificationContext | null>(
  null
);

ToastNotificationContext.displayName = 'ToastNotification';

export const { Consumer, Provider } = ToastNotificationContext;

export interface IToastNotificationProviderProps {
  parentNode?: HTMLElement;
  placement?: PlacementType;
  children: React.ReactNode;
}

export const ToastNotificationProvider = ({
  parentNode,
  placement = 'top-left',
  children
}: IToastNotificationProviderProps) => {
  const [nextId, setNextId] = useState<number>(0);
  const incrementNextId = () => setNextId(nextId + 1);

  const [toastNotifications, setToastNotifications] = useState<
    ToastNotificationMap
  >({});

  const updateToastNotificationState = (id: ToastId, state: ToastState) => {
    if (toastNotifications[id]) {
      setToastNotifications({
        ...toastNotifications,
        [id]: { ...toastNotifications[id], state }
      });
    }
  };

  const addToastNotification = ({
    contents,
    variant = 'info'
  }: {
    contents?: GenerateContentsFunction;
    variant?: ToastVariant;
  }) => {
    const id = nextId;
    const notification = {
      [id]: { contents, variant, state: ToastState.ENTERING }
    };
    setToastNotifications({ ...toastNotifications, ...notification });
    incrementNextId();
    return `${id}`;
  };

  const removeToastNotification = (id: ToastId) => {
    if (toastNotifications[id]?.state) {
      setToastNotifications({
        ...toastNotifications,
        [id]: { ...toastNotifications[id], state: ToastState.CLOSING }
      });
    } else {
      console.log("Toast doesn't exist.");
    }
  };

  const removeAllNotifications = () => {
    const nextNotifications = { ...toastNotifications };
    Object.entries(toastNotifications).forEach(([id, notfication]) => {
      nextNotifications[id].state = ToastState.CLOSING;
    });
    setToastNotifications({ ...nextNotifications });
  };

  useEffect(() => {
    const nextNotifications = { ...toastNotifications };

    const closedNotifications = Object.entries(toastNotifications).filter(
      ([id, notification]) => notification.state === ToastState.CLOSED
    );
    if (closedNotifications.length > 0) {
      closedNotifications.forEach(([id, notfication]) => {
        delete nextNotifications[id];
      });

      setToastNotifications({ ...nextNotifications });
    }
  }, [toastNotifications, setToastNotifications]);

  let portalNode = parentNode ?? window.document.body;

  return (
    <Provider
      value={{
        addToast: addToastNotification,
        removeAllToasts: removeAllNotifications,
        removeToast: removeToastNotification,
        toastNotificationState: toastNotifications,
        updateToastNotificationState
      }}
    >
      {children}
      {createPortal(
        <ToastNotificationContainer placement={placement}>
          {Object.entries(toastNotifications).map(([toastId, notification]) => {
            return <Toast key={toastId} toastId={toastId} {...notification} />;
          })}
        </ToastNotificationContainer>,
        portalNode
      )}
    </Provider>
  );
};

export type ToastNotification = {
  toastId: ToastId;
  content: GenerateContentsFunction;
};

export interface IToastNotificationContext {
  addToast: AddToastFunction;
  removeToast: RemoveToastFunction;
  removeAllToasts: RemoveAllToastsFunction;
  toastNotificationState: ToastNotificationMap;
  updateToastNotificationState: UpdateToastStateFunction;
}

export const useToastNotifications = (): IToastNotificationContext => {
  const context = useContext<IToastNotificationContext | null>(
    ToastNotificationContext
  );
  if (context === null) {
    throw Error('No Toast Notification Provider parent found.');
  } else {
    return context;
  }
};
