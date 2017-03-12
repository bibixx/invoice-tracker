import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/Layout";
import RootPlaceholder from "./components/RootPlaceholder";
import DetailView from "./components/DetailView";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={RootPlaceholder} />
    <Route path="product/:id" component={DetailView} type="product" />
    <Route path="/add-product" component={DetailView} type="addProduct" />
    <Route path="/add-seller" component={DetailView} type="addSeller" />
  </Route>
);

document.addEventListener( "DOMContentLoaded", () => {
  ReactDOM.render( <Router history={browserHistory}>{ routes }</Router>, document.getElementById( "app" ) );
} );
