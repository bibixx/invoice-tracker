import grey from '@material-ui/core/colors/grey';

export default theme => ({
  card: {
    background: theme.palette.type === 'dark' ? grey[700] : grey[100],
    transition: '0.2s ease-in-out',
    transitionProperty: 'box-shadow, transform',
    transform: 'translateY(0)',
    '&:hover': {
      transform: 'translateY(-2%)',
    },
  },
  icon: {
    color: theme.palette.type === 'dark' ? grey[300] : grey[100],
  },
  link: {
    textDecoration: 'none',
  },
});
