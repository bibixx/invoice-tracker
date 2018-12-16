import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { switchTheme as switchThemeAction } from 'src/actions/theme';

import URLS from 'src/constants/urls';

import { withStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import LightbulbFilled from './LightbulbFilled/LightbulbFilled';
import LightbulbOutline from './LightbulbOutline/LightbulbOutline';

import styles from './AppBar.styles';

const AppBar = ({ classes, switchTheme, theme }) => (
  <div className={classes.root}>
    <MUIAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Receipt tracker
        </Typography>
        <div className={classes.menu}>
          <div>
            <IconButton color="inherit" onClick={switchTheme}>
              {theme === 'dark'
                ? (<LightbulbOutline />)
                : (<LightbulbFilled />)
              }
            </IconButton>
            <Button color="inherit" component={Link} to={URLS.products()}>Products</Button>
            <Button color="inherit" component={Link} to={URLS.companies()}>Companies</Button>
          </div>
        </div>
      </Toolbar>
    </MUIAppBar>
  </div>
);

AppBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  switchTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ theme }) => ({ theme });

const mapDispatchToProps = dispatch => ({
  switchTheme: () => dispatch(switchThemeAction()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppBar));
