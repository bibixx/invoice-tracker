export default () => ({
  card: {
    height: '100%',
    transition: '0.2s ease-in-out',
    transitionProperty: 'box-shadow, transform',
    transform: 'translateY(0)',
  },
  hover: {
    transform: 'translateY(-2%)',
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
    height: '100%',
  },
});
