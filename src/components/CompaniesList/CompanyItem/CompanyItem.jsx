import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { fullCompanyPropTypes } from 'src/propTypes/companyPropTypes';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AccountBalance from '@material-ui/icons/AccountBalance';

import URLS from 'src/constants/urls';

import styles from './CompanyItem.styles';

const CompanyItem = ({ company, classes }) => {
  const [hover, setHover] = useState(false);

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        className={cn(classes.card, { [classes.hover]: hover })}
        elevation={hover ? 10 : 2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <ButtonBase
          className={classes.cardAction}
          component={Link}
          to={URLS.companyById(company.id)}
        >
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography variant="h5" component="h2" className={classes.text}>
              {company.name}
            </Typography>

            {company.isPlaceOfPurchase && (
              <Tooltip title="Place of purchase">
                <Avatar className={cn(classes.avatar)}>
                  <AccountBalance className={classes.avatarIcon} />
                </Avatar>
              </Tooltip>
            )}
            {company.isSeller && (
              <Tooltip title="Seller">
                <Avatar className={cn(classes.avatar)}>
                  <AttachMoney className={classes.avatarIcon} />
                </Avatar>
              </Tooltip>
            )}

            <Typography color="textSecondary" className={classes.text}>
              {`${company.streetAddress}, ${company.city}`}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </Grid>
  );
};

CompanyItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  company: fullCompanyPropTypes.isRequired,
};

export default withStyles(styles)(CompanyItem);
