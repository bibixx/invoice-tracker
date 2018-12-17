import React from 'react';
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

const ProductItem = ({ product, classes }) => (
  <Grid item xs={4}>
    <Card className={classes.card}>
      <ButtonBase
        className={classes.cardAction}
        component={Link}
        to={URLS.productById(product.id)}
      >
        <CardContent classes={{ root: classes.cardContent }}>
          <Typography variant="h5" component="h2">
            {product.name}
          </Typography>
          <ProductItemChip product={product} />
          <Typography color="textSecondary">
            {product.placeOfPurchase.name}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  </Grid>
);

ProductItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  product: listProductPropTypes.isRequired,
};

export default withStyles(styles)(ProductItem);
