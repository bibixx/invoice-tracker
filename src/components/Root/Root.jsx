import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import store from 'src/store';
import theme from 'src/styles/theme';

import ProductsList from 'src/components/ProductsList/ProductsList';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ProductsList />
    </MuiThemeProvider>
  </Provider>
);

export default App;
