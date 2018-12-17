import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './Pagination.styles';

const Pagination = ({
  currentPage, totalPages, onNextPage, onPrevPage, classes,
}) => (
  <div className={classes.container}>
    <Button
      variant="contained"
      onClick={onPrevPage}
      disabled={currentPage <= 0}
    >
      Previous page
    </Button>
    <Typography variant="body1" className={classes.pageIndicator}>
      {`${currentPage + 1} / ${totalPages}`}
    </Typography>
    <Button
      variant="contained"
      onClick={onNextPage}
      disabled={currentPage >= totalPages - 1}
    >
      Next page
    </Button>
  </div>
);

Pagination.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
};

export default withStyles(styles)(Pagination);
