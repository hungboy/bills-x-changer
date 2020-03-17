import React, { createContext, useEffect, useContext, useReducer } from 'react';
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
import {
  DEFAULT_GENERATE_CONTENTS_FUNCTION,
  DEFAULT_TOAST_VARIANT
} from '../../constants';

import {
  addToastAction,
  updateToastsAction,
  removeToastsAction,
  reducer,
  INITIAL_STATE
} from '../../reducer';
import { generateUEID } from '../../../../../utils/ueid';

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
  const [{ toastNotifications }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateToastNotificationState = (id: ToastId, state: ToastState) => {
    if (toastNotifications[id]) {
      dispatch(updateToastsAction([{ id, state }]));
    }
  };

  const addToastNotification = ({
    contents,
    variant = 'info'
  }: {
    contents?: GenerateContentsFunction;
    variant?: ToastVariant;
  }) => {
    const id = generateUEID();
    const notification = {
      contents: contents ?? DEFAULT_GENERATE_CONTENTS_FUNCTION,
      variant: variant ?? DEFAULT_TOAST_VARIANT,
      state: ToastState.ENTERING
    };

    dispatch(addToastAction({ id, notification }));

    return `${id}`;
  };

  const removeToastNotification = (id: ToastId) => {
    if (toastNotifications[id]?.state) {
      dispatch(updateToastsAction([{ id, state: ToastState.CLOSING }]));
    } else {
      console.log("Toast doesn't exist.");
    }
  };

  const removeAllNotifications = () => {
    const updatedToasts = Object.entries(toastNotifications).map(
      ([id, notfication]) => ({
        id,
        state: ToastState.CLOSING
      })
    );

    dispatch(updateToastsAction(updatedToasts));
  };

  //Filter Closed notifications
  useEffect(() => {
    const closedNotifications = Object.entries(toastNotifications)
      .filter(([id, notification]) => notification.state === ToastState.CLOSED)
      .map(([id]) => id);

    if (closedNotifications.length > 0) {
      removeToastsAction({ ids: closedNotifications });
    }
  }, [toastNotifications]);

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
