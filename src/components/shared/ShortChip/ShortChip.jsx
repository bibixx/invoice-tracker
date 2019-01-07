import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import styles from './ShortChip.styles';

const ShortChip = ({ classes, ...props }) => (
  <Chip
    classes={{
      root: classes.chip,
    }}
    {...props}
  />
);

export default withStyles(styles)(ShortChip);
