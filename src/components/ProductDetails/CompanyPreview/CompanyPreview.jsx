import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import URLS from 'src/constants/urls';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

import AttachMoney from '@material-ui/icons/AttachMoney';
import AccountBalance from '@material-ui/icons/AccountBalance';

import { fullCompanyPropTypes } from 'src/propTypes/companyPropTypes';

import styles from './CompanyPreview.styles';

const CompanyPreview = ({ classes, company, isSeller }) => (
  <Grid item xs={12} md={6}>
    <Link to={URLS.companyById(company.id)} className={classes.link}>
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {isSeller
                ? (<AttachMoney className={classes.icon} />)
                : (<AccountBalance className={classes.icon} />)
              }
            </Avatar>
          )}
          title={company.name}
          subheader={`${company.streetAddress}, ${company.city}`}
        />
      </Card>
    </Link>
  </Grid>
);

CompanyPreview.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  company: fullCompanyPropTypes.isRequired,
  isSeller: PropTypes.bool,
};

CompanyPreview.defaultProps = {
  isSeller: false,
};

export default withStyles(styles)(CompanyPreview);
