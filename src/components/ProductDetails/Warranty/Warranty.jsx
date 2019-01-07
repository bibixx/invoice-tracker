import React from 'react';
import PropTypes from 'prop-types';
import { fullProductPropTypes } from 'src/propTypes/productPropTypes';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import EventAvailable from '@material-ui/icons/EventAvailable';
import EventBusy from '@material-ui/icons/EventBusy';

import addYears from 'date-fns/add_years';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import differenceInMonths from 'date-fns/difference_in_months';

import styles from './Warranty.styles';

const Warranty = ({ product, classes }) => {
  const dateDiff = differenceInMonths(
    addYears(new Date(product.timestamp), product.warrantyLength),
    new Date(),
  );

  const isOverdue = dateDiff < 0;

  return (
    <div>
      <Chip
        className={cn(
          {
            [classes.overdue]: isOverdue,
            [classes.short]: dateDiff >= 0 && dateDiff < 6,
            [classes.long]: dateDiff >= 6,
          },
        )}
        avatar={(
          <Avatar className={cn(classes.avatar, {
            [classes.overdueIcon]: isOverdue,
            [classes.shortIcon]: dateDiff >= 0 && dateDiff < 6,
            [classes.longIcon]: dateDiff >= 6,
          })}
          >
            {(isOverdue) ? (
              <EventBusy className={classes.avatarIcon} />
            ) : (
              <EventAvailable className={classes.avatarIcon} />
            )}
          </Avatar>
        )}
        label={
        `${distanceInWordsStrict(
          new Date(),
          addYears(new Date(product.timestamp), product.warrantyLength),
          { addSuffix: true },
        )} (${distanceInWordsStrict(new Date(), addYears(new Date(), product.warrantyLength))})`}
      />
    </div>
  );
};

Warranty.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  product: fullProductPropTypes.isRequired,
};

export default withStyles(styles)(Warranty);
