import React from "react";
import { render } from "react-dom";

import purple from "material-ui/colors/purple";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import Reboot from "material-ui/Reboot";

import AppBar from "./AppBar";
import RecordsList from "./RecordsList";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: purple[500],
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Reboot />
    <AppBar />
    <RecordsList />
  </MuiThemeProvider>
);

render(<App />, document.getElementById("app"));
