import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducer from "./reducers";

const logger = createLogger( {
  collapsed: true,
} );

const middleware = applyMiddleware( thunk, logger );
export default createStore( reducer, middleware );
