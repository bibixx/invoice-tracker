import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from 'src/components/shared/AppBar/AppBar';

import styles from './Page.styles';

const Page = ({ classes, children }) => (
  <div className={classes.root}>
    <AppBar />
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
