import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";

import store from "./store";

import App from "./components/Layout";
import Product from "./components/DetailView/Product";
import Seller from "./components/DetailView/Seller";
import AddProduct from "./components/DetailView/AddProduct";
import AddSeller from "./components/DetailView/AddSeller";
import RootPlaceholder from "./components/RootPlaceholder";

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ RootPlaceholder } />
    <Route path="product/:id" component={ Product } type="product" />
    <Route path="product/:id/edit" component={ AddProduct } type="EditProduct" />

    <Route path="seller/:id" component={ Seller } type="seller" />
    <Route path="add-product" component={ AddProduct } type="AddProduct" />
    <Route path="add-seller" component={ AddSeller } type="AddSeller" />
    <Route path="*" component={ RootPlaceholder } />
  </Route>
);

document.addEventListener( "DOMContentLoaded", () => {
  ReactDOM.render( (
    <Provider store={ store }>
      <Router history={ browserHistory }>{ routes }</Router>
    </Provider>
  ), document.getElementById( "app" ) );
} );
