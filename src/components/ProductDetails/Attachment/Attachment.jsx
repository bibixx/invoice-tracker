import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';

import styles from './Attachment.styles';

const withStylesProps = compStyles => Component => (props) => {
  const Comp = withStyles(theme => compStyles(theme, props))(Component);
  return <Comp {...props} />;
};

const Attachment = ({ classes, image: { url }, createNew }) => {
  const [hover, setHover] = useState(false);

  const RootElement = !createNew ? 'a' : 'div';

  return (
    <Grid item xs={12} sm={4} md={2}>
      <RootElement
        {...(!createNew && {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: classes.link,
        })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <Paper
          elevation={hover ? 8 : 2}
          className={classes.attachment}
        >
          {createNew && (
            <Typography variant="h4" className={classes.attachmentIcon}>
              <AddCircle className={classes.createNew} />
            </Typography>
          )}
        </Paper>
      </RootElement>
    </Grid>
  );
};

Attachment.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  createNew: PropTypes.bool,
  image: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
  }),
};

Attachment.defaultProps = {
  image: {},
  createNew: false,
};

export default withStylesProps(styles)(Attachment);
