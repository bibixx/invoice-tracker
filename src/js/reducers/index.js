import { combineReducers } from "redux";

import records from "./RecordsReducer";
import sellers from "./SellersReducer";

export default combineReducers( {
  records,
  sellers,
} );
