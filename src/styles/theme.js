import { createMuiTheme } from '@material-ui/core/styles';

export const light = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

export const dark = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});
