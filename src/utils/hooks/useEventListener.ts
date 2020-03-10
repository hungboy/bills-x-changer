import React, { useEffect, useRef, EventHandler } from 'react';

export const useEventListener = (
  eventName: string,
  handler: EventHandler<any>,
  element = window
) => {
  const savedHandler = useRef<EventHandler<any>>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported =
      element &&
      element.addEventListener &&
      typeof savedHandler.current !== 'undefined';
    if (!isSupported) {
      return;
    }

    const eventListener = (event: Event) =>
      typeof savedHandler.current !== 'undefined'
        ? savedHandler.current(event)
        : {};

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
