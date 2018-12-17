import { createMuiTheme } from '@material-ui/core/styles';

import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';

import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

import { darken } from '@material-ui/core/styles/colorManipulator';

export const light = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: deepPurple,
    secondary: blue,
    dateChips: {
      long: {
        background: green[500],
        backgroundIcon: green[800],
        color: '#fff',
        colorIcon: '#fff',
      },
      short: {
        background: yellow[600],
        backgroundIcon: yellow[800],
        color: '#000',
        colorIcon: '#000',
      },
      overdue: {
        background: red[500],
        backgroundIcon: red[800],
        color: '#fff',
        colorIcon: '#fff',
      },
    },
  },
});

export const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: deepPurple,
    secondary: blue,
    dateChips: {
      long: {
        background: green[600],
        backgroundIcon: green[800],
        color: '#fff',
        colorIcon: '#fff',
      },
      short: {
        background: yellow[600],
        backgroundIcon: yellow[800],
        color: '#000',
        colorIcon: '#000',
      },
      overdue: {
        background: red[800],
        backgroundIcon: darken(red[900], 0.15),
        color: '#fff',
        colorIcon: '#fff',
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});
