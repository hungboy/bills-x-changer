import { ToastNotificationMap } from '../types';
import {
  ToastNotificationActions,
  ADD_TOAST,
  REMOVE_TOASTS,
  UPDATE_TOASTS,
  RemoveToastsPayload,
  UpdateToastActionPayload
} from './actions';

export {
  addToastAction,
  updateToastsAction,
  removeToastsAction
} from './actions';

export interface IToastNotificationProviderState {
  toastNotifications: ToastNotificationMap;
}

export const INITIAL_STATE: IToastNotificationProviderState = {
  toastNotifications: {}
};

export const reducer = (
  state: IToastNotificationProviderState,
  action: ToastNotificationActions
) => {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        toastNotifications: {
          ...state.toastNotifications,
          [action.payload.id]: action.payload.notification
        }
      };
    case UPDATE_TOASTS:
      return {
        ...state,
        toastNotifications: {
          ...handleUpdateToasts(state, action.payload)
        }
      };
    case REMOVE_TOASTS:
      return {
        ...state,
        toastNotifications: { ...handleRemoveToasts(state, action.payload) }
      };

    default:
      return state;
  }
};

export const handleUpdateToasts = (
  state: IToastNotificationProviderState,
  payload: UpdateToastActionPayload[]
) => {
  return payload.reduce(
    (nextToasts, { id, state: nextState }) => {
      if (nextToasts[id]) {
        nextToasts[id].state = nextState;
      }

      return nextToasts;
    },
    {
      ...state.toastNotifications
    }
  );
};

export const handleRemoveToasts = (
  state: IToastNotificationProviderState,
  { ids }: RemoveToastsPayload
) => {
  return ids.reduce(
    (nextNotifications, id) => {
      if (nextNotifications[id]) {
        delete nextNotifications[id];
      }
      return nextNotifications;
    },
    { ...state.toastNotifications }
  );
};
