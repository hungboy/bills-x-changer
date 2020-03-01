import { StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const applyReduxDevTools = (enhancers: StoreEnhancer) => {
  return process.env.NODE_ENV === "development"
    ? composeWithDevTools(enhancers)
    : enhancers;
};
