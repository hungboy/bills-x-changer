import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  IToastNotificationContext,
  ToastNotificationContext
} from '../ToastNotificationProvider/component';
import {
  ToastVariant,
  GenerateContentsFunction,
  ToastState,
  OnCloseFunction
} from '../../types';
import colors from '../../../../../styles/colors.module.scss';
import './styles.scss';

const DEFAULT_TRANSITION_DURATION_MS = 500;
const DEFAULT_TOAST_GUTTER_PX = 10;
const DEFAULT_WRAPPER_HEIGHT = 'auto';

export interface IToastProps {
  toastId: string;
  contents: GenerateContentsFunction;
  variant: ToastVariant;
  onClose?: OnCloseFunction;
  state?: ToastState;
}

export const calculateWrapperTransition = (
  transitionDuration: number = DEFAULT_TRANSITION_DURATION_MS
) => ({
  transition: `height ${DEFAULT_TRANSITION_DURATION_MS}ms linear `
});

export const calculateToastTransition = (
  transitionDuration: number = DEFAULT_TRANSITION_DURATION_MS
) => ({
  transition: `opacity ${DEFAULT_TRANSITION_DURATION_MS}ms `
});

export const calculateToastStyle = (variant: ToastVariant) => {
  const colorMap = {
    info: colors.blue,
    warning: colors.brown,
    success: colors.green,
    error: colors.red
  };

  return {
    backgroundColor: colorMap[variant],
    borderColor: colorMap[variant]
  };
};

export const Toast = ({ toastId, contents, variant, state }: IToastProps) => {
  const context = useContext<IToastNotificationContext | null>(
    ToastNotificationContext
  );

  if (context === null) {
    throw Error(
      'Toast Notification requires a Toast Notification Provider Parent.'
    );
  }
  const { updateToastNotificationState } = context;

  const wrapperElement = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState<string>(
    DEFAULT_WRAPPER_HEIGHT
  );
  const [toastOpacity, setToastOpacity] = useState<number>(0);

  const handleToastClose = () => {
    updateToastNotificationState(toastId, ToastState.CLOSING);
  };

  useEffect(() => {
    if (state === ToastState.ENTERING) {
      setToastOpacity(1);
      updateToastNotificationState(toastId, ToastState.ENTERED);
    }
    if (
      state === ToastState.ENTERED &&
      wrapperElement.current?.offsetHeight &&
      wrapperHeight === DEFAULT_WRAPPER_HEIGHT
    ) {
      setWrapperHeight(
        `${wrapperElement.current.offsetHeight + DEFAULT_TOAST_GUTTER_PX}px`
      );
    }
    if (state === ToastState.CLOSING) {
      setWrapperHeight('0px');
      setToastOpacity(0);
      setTimeout(() => {
        updateToastNotificationState(toastId, ToastState.CLOSED);
      }, DEFAULT_TRANSITION_DURATION_MS);
    }
  }, [
    state,
    updateToastNotificationState,
    setWrapperHeight,
    wrapperHeight,
    setToastOpacity,
    toastId
  ]);

  return (
    <div
      ref={wrapperElement}
      style={{
        ...calculateWrapperTransition(),
        height: wrapperHeight
      }}
    >
      <div
        className="toast-notification"
        style={{
          ...calculateToastTransition(),
          ...(calculateToastStyle(variant) as any),
          opacity: toastOpacity
        }}
      >
        <div
          className="toast-notification__close-button"
          onClick={() => handleToastClose()}
        />
        <div className="toast-notification__contents">{contents(toastId)}</div>
      </div>
    </div>
  );
};
