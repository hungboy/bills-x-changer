import { Dispatch, Middleware, MiddlewareAPI, Action } from "redux";

export const crashReporterMiddleware: Middleware = ({
  getState
}: MiddlewareAPI) => (next: Dispatch) => action => {
  try {
    return next(action);
  } catch (e) {
    console.error("Caught an exception!", e);
    console.log("Extra Info:", { state: getState(), action });
    throw e;
  }
};
