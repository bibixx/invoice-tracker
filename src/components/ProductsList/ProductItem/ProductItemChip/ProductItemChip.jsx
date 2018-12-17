import React from 'react';
import PropTypes from 'prop-types';
import { listProductPropTypes } from 'src/propTypes/productPropTypes';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import addYears from 'date-fns/add_years';
import differenceInMonths from 'date-fns/difference_in_months';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import EventAvailable from '@material-ui/icons/EventAvailable';
import EventBusy from '@material-ui/icons/EventBusy';

import styles from './ProductItemChip.styles';

const ProductItemChip = ({ product, classes }) => {
  const dateDiff = differenceInMonths(
    addYears(new Date(product.timestamp), product.warrantyLength),
    new Date(),
  );

  const isOverdue = dateDiff < 0;

  return (
    <Chip
      classes={{
        root: classes.chip,
      }}
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
      label={distanceInWordsStrict(
        new Date(),
        addYears(new Date(product.timestamp), product.warrantyLength),
        { addSuffix: isOverdue },
      )}
      className={cn({
        [classes.overdue]: isOverdue,
        [classes.short]: dateDiff >= 0 && dateDiff < 6,
        [classes.long]: dateDiff >= 6,
      })}
    />
  );
};

ProductItemChip.propTypes = {
  product: listProductPropTypes.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ProductItemChip);
