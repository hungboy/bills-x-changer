import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import { crashReporterMiddleware } from "./crashReporter";
import { applyReduxDevTools } from "./devToolsMiddleware";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyReduxDevTools(applyMiddleware(sagaMiddleware, crashReporterMiddleware))
);

sagaMiddleware.run(rootSaga);
