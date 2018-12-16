import React from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import URLS from 'src/constants/urls';
import store from 'src/store';

import Theme from 'src/components/Theme/Theme';

import ProductsList from 'src/components/ProductsList/ProductsList';
import CompaniesList from 'src/components/CompaniesList/CompaniesList';

const App = () => (
  <Provider store={store}>
    <Theme>
      <Router>
        <Switch>
          <Route exact path={URLS.products()} component={ProductsList} />
          <Route exact path={URLS.companies()} component={CompaniesList} />
          <Redirect to={URLS.products()} />
        </Switch>
      </Router>
    </Theme>
  </Provider>
);

export default App;
