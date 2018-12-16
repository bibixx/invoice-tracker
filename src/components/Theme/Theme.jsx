import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { light, dark } from 'src/styles/theme';

import CssBaseline from '@material-ui/core/CssBaseline';

const Theme = ({ children, theme }) => (
  <MuiThemeProvider theme={theme === 'dark' ? dark : light}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

Theme.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = ({ theme }) => ({ theme });

export default connect(mapStateToProps)(Theme);
