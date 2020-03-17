export type PlacementType =
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'top-right'
  | 'top-center'
  | 'top-left';

export type ToastVariant = 'info' | 'warning' | 'error' | 'success';

export type ToastId = string;

export type AddToastFunction = ({
  contents,
  variant
}: {
  contents?: GenerateContentsFunction;
  variant?: ToastVariant;
}) => ToastId;

export type GenerateContentsFunction = (id: ToastId) => React.ReactChild;

export type RemoveToastFunction = (id: ToastId) => void;

export type RemoveAllToastsFunction = () => void;

export enum ToastState {
  ENTERING = 'entering',
  ENTERED = 'entered',
  CLOSING = 'closing',
  CLOSED = 'closed'
}

export type UpdateToastStateFunction = (id: ToastId, state: ToastState) => void;

export type ToastNotificationMap = {
  [id in ToastId]: {
    state: ToastState;
    contents: GenerateContentsFunction;
    variant: ToastVariant;
  };
};
