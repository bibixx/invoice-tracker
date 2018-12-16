import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './styles';

const ProductsList = ({ n, dispatch, classes }) => (
  <div className={classes.layout}>
    <span>{n}</span>
    <Button
      variant="contained"
      color="primary"
      onClick={() => { dispatch({ type: 'INCREMENT_ASYNC' }); }}
    >
  TEST
    </Button>
  </div>
);

ProductsList.propTypes = {
  n: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ counter }) => ({ n: counter });

export default connect(mapStateToProps)(withStyles(styles)(ProductsList));
