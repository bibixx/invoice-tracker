export default theme => ({
  root: {
    paddingTop: theme.mixins.toolbar.minHeight + theme.spacing.unit * 2,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      paddingTop: theme.mixins.toolbar[`${theme.breakpoints.up('xs')} and (orientation: landscape)`].minHeight + theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight + theme.spacing.unit * 2,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});
