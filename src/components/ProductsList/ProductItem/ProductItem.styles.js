export default theme => ({
  card: {
    height: '100%',
    transition: '0.2s ease-in-out',
    transitionProperty: 'box-shadow, transform',
    transform: 'translateY(0)',
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  hover: {
    transform: 'translateY(-2%)',
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    height: '100%',
  },
});
