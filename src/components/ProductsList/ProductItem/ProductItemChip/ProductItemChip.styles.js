export default theme => ({
  cardContent: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  chip: {
    height: 24,
    borderRadius: 12,
    margin: [[8, 0]],
  },
  avatar: {
    height: 24,
    width: 24,
  },
  avatarIcon: {
    height: 14,
    width: 14,
  },
  pos: {
    marginBottom: 8,
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
