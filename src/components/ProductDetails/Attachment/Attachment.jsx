import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './Attachment.styles';

const withStylesProps = compStyles => Component => (props) => {
  const Comp = withStyles(theme => compStyles(theme, props))(Component);
  return <Comp {...props} />;
};

const Attachment = ({ classes, image: { url, ext } }) => (
  <Grid item xs={12} sm={4} md={2}>
    <a href={url} target="_blank" rel="noopener noreferrer" className={classes.link}>
      <Paper
        elevation={2}
        className={classes.attachment}
      >
        {ext && (
          <Typography variant="h4" className={classes.attachmentIcon}>
            {ext}
          </Typography>
        )}
      </Paper>
    </a>
  </Grid>
);

Attachment.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    ext: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStylesProps(styles)(Attachment);
