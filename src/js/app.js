import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/Layout";
import Product from "./components/DetailView/Product";
import Seller from "./components/DetailView/Seller";
import AddProduct from "./components/DetailView/AddProduct";
import RootPlaceholder from "./components/RootPlaceholder";

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ RootPlaceholder } />
    <Route path="product/:id" component={ Product } type="product" />
    <Route path="seller/:id" component={ Seller } type="seller" />
    <Route path="add-product" component={ AddProduct } type="AddProduct" />
  </Route>
);

document.addEventListener( "DOMContentLoaded", () => {
  ReactDOM.render( <Router history={ browserHistory }>{ routes }</Router>, document.getElementById( "app" ) );
} );
