import grey from '@material-ui/core/colors/grey';

export default theme => ({
  card: {
    background: theme.palette.type === 'dark' ? grey[700] : grey[100],
  },
  icon: {
    color: theme.palette.type === 'dark' ? grey[300] : grey[100],
  },
  link: {
    textDecoration: 'none',
  },
});
