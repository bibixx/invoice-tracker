export default theme => ({
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  avatar: {
    height: theme.spacing.unit * 3,
    width: theme.spacing.unit * 3,
  },
  avatarIcon: {
    height: theme.spacing.unit * 1.75,
    width: theme.spacing.unit * 1.75,
  },
  pos: {
    marginBottom: theme.spacing.unit,
  },
  listItem: {
    background: theme.palette.background.paper,
  },
  long: {
    background: theme.palette.dateChips.long.background,
    color: theme.palette.dateChips.long.color,
  },
  short: {
    background: theme.palette.dateChips.short.background,
    color: theme.palette.dateChips.short.color,
  },
  overdue: {
    background: theme.palette.dateChips.overdue.background,
    color: theme.palette.dateChips.overdue.color,
  },
  longIcon: {
    background: theme.palette.dateChips.long.backgroundIcon,
    color: theme.palette.dateChips.long.colorIcon,
  },
  shortIcon: {
    background: theme.palette.dateChips.short.backgroundIcon,
    color: theme.palette.dateChips.short.colorIcon,
  },
  overdueIcon: {
    background: theme.palette.dateChips.overdue.backgroundIcon,
    color: theme.palette.dateChips.overdue.colorIcon,
  },
});
