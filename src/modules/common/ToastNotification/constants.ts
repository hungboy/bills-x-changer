import { ToastVariant, ToastId, GenerateContentsFunction } from './types';

export const DEFAULT_GENERATE_CONTENTS_FUNCTION: GenerateContentsFunction = (
  id: ToastId
) => 'Sample Toast Notification.........';
export const DEFAULT_TOAST_VARIANT: ToastVariant = 'info';
