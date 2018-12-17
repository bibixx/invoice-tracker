import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

import { darken } from '@material-ui/core/styles/colorManipulator';

export const light = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    dateChips: {
      long: {
        background: green[800],
        backgroundIcon: green[900],
        color: '#fff',
        colorIcon: '#fff',
      },
      short: {
        background: yellow[700],
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
});

export const dark = createMuiTheme({
  palette: {
    type: 'dark',
    dateChips: {
      long: {
        background: green[800],
        backgroundIcon: green[900],
        color: '#fff',
        colorIcon: '#fff',
      },
      short: {
        background: yellow[700],
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
