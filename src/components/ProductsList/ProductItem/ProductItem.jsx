import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { listProductPropTypes } from 'src/propTypes/productPropTypes';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import URLS from 'src/constants/urls';

import ProductItemChip from './ProductItemChip/ProductItemChip';

import styles from './ProductItem.styles';

const ProductItem = ({ product, classes }) => {
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
          to={URLS.productById(product.id)}
        >
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography variant="h5" component="h2" className={classes.text}>
              {product.name}
            </Typography>
            <ProductItemChip product={product} />
            <Typography color="textSecondary" className={classes.text}>
              {product.placeOfPurchase.name}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </Grid>
  );
};

ProductItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  product: listProductPropTypes.isRequired,
};

export default withStyles(styles)(ProductItem);
