import { combineReducers } from 'redux';

import companies from './companies';
import products from './products';
import theme from './theme';

export default combineReducers({
  companies,
  products,
  theme,
});
