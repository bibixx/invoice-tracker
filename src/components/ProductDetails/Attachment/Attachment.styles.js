import grey from '@material-ui/core/colors/grey';
import common from '@material-ui/core/colors/common';

export default (theme, props) => ({
  attachment: {
    ...theme.mixins.gutters(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.type === 'dark' ? grey[700] : grey[100],
    height: theme.spacing.unit * 17,
    transition: '0.2s ease-in-out',
    transitionProperty: 'box-shadow, transform',
    transform: 'translateY(0)',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundPosition: [['center', 'center']],
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: props && props.image && `url(${props.image.url})`,
      opacity: theme.palette.type === 'dark' ? 0.66 : 1,
    },
    '&::after, $attachmentIcon': {
      transition: 'opacity .1s ease-in-out',
    },
    '&:hover': {
      transform: 'translateY(-2%)',
      '&::after': {
        opacity: theme.palette.type === 'dark' ? 0.9 : 1,
      },
      '& $attachmentIcon': {
        opacity: theme.palette.type === 'dark' ? 0.75 : 0.8,
      },
    },
  },
  link: {
    textDecoration: 'none',
  },
  attachmentIcon: {
    color: theme.palette.type === 'dark' ? common.white : grey[700],
    fontWeight: 'bold',
    position: 'absolute',
    opacity: theme.palette.type === 'dark' ? 0.33 : 0.5,
    zIndex: 1,
    textTransform: 'uppercase',
  },
  createNew: {
    fontSize: 64,
  },
});
