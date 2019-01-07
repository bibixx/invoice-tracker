export default (theme) => {
  const backgroundColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  return ({
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
    chipContainer: {
      display: 'grid',
      margin: [[theme.spacing.unit, 0]],
      gridGap: `${theme.spacing.unit}px`,
    },
    chip: {
      margin: 0,
    },
    avatar: {
      display: 'inline-flex',
      margin: [[theme.spacing.unit, 0]],
      marginRight: theme.spacing.unit,
      height: theme.spacing.unit * 3,
      width: theme.spacing.unit * 3,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
    },
    avatarIcon: {
      height: theme.spacing.unit * 1.75,
      width: theme.spacing.unit * 1.75,
    },
  });
};
