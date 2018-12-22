import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './Page.styles';

const Page = ({ classes, children }) => (
  <div className={classes.root}>
    <div className={classes.layout}>
      {children}
    </div>
  </div>
);

Page.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Page);
