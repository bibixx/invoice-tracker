import grey from '@material-ui/core/colors/grey';
import common from '@material-ui/core/colors/common';

export default theme => (console.log(theme), ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  attachment: {
    ...theme.mixins.gutters(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: grey[700],
  },
  attachmentIcon: {
    color: common.white,
    fontSize: theme.spacing.unit * 10,
  },
}));
