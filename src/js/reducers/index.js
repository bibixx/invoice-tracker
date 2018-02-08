import { combineReducers } from "redux";

import receipts from "./Receipts";
import sellers from "./Sellers";

export default combineReducers({
  receipts,
  sellers,
});
