import { ToastId, ToastNotification, ToastState } from '../types';

export const ADD_TOAST = 'toastNotifications/ADD_TOAST';
export type ADD_TOAST = typeof ADD_TOAST;
export const UPDATE_TOASTS = 'toastNotifications/UPDATE_TOASTS';
export type UPDATE_TOASTS = typeof UPDATE_TOASTS;

export const REMOVE_TOASTS = 'toastNotifications/REMOVE_TOASTS';
export type REMOVE_TOASTS = typeof REMOVE_TOASTS;

export type AddToastActionPayload = {
  id: ToastId;
  notification: ToastNotification;
};
export type AddToastAction = {
  type: ADD_TOAST;
  payload: AddToastActionPayload;
};

export const addToastAction = (
  payload: AddToastActionPayload
): AddToastAction => ({ type: ADD_TOAST, payload });

export type UpdateToastActionPayload = {
  id: ToastId;
  state: ToastState;
};

export type UpdateToastsAction = {
  type: UPDATE_TOASTS;
  payload: UpdateToastActionPayload[];
};

export const updateToastsAction = (
  payload: UpdateToastActionPayload[]
): UpdateToastsAction => ({ type: UPDATE_TOASTS, payload });

export type RemoveToastsPayload = { ids: ToastId[] };

export type RemoveToastsAction = {
  type: REMOVE_TOASTS;
  payload: RemoveToastsPayload;
};

export const removeToastsAction = (
  payload: RemoveToastsPayload
): RemoveToastsAction => ({
  type: REMOVE_TOASTS,
  payload
});

export type ToastNotificationActions =
  | AddToastAction
  | UpdateToastsAction
  | RemoveToastsAction;
