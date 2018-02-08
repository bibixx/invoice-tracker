import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import purple from "material-ui/colors/purple";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import Reboot from "material-ui/Reboot";

import store from "./store";
import AppBar from "./components/AppBar";
import MainList from "./components/Main/MainList/";
import DetailView from "./components/DetailView/";
import { initMoment } from "./utils/Date";

initMoment();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[400],
      main: purple[500],
      dark: purple[600],
      contrastText: "#fff",
    },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <AppBar />
        <Route exact path="/" component={MainList} />
        <Route exact path="/sellers" component={MainList} />
        <Route exact path="/receipt/:id" component={DetailView} />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);

render(<App />, document.getElementById("app"));
