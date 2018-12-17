import React, { Component } from 'react';
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

class ProductItem extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    product: listProductPropTypes.isRequired,
  }

  state = {
    hover: false,
  }

  onHover = () => {
    this.setState({
      hover: true,
    });
  }

  onBlur = () => {
    this.setState({
      hover: false,
    });
  }

  render() {
    const { product, classes } = this.props;
    const { onHover, onBlur } = this;
    const { hover } = this.state;

    return (
      <Grid item xs={12} sm={4} md={3}>
        <Card
          className={cn(classes.card, { [classes.hover]: hover })}
          elevation={hover ? 15 : 2}
          onMouseEnter={onHover}
          onMouseLeave={onBlur}
          onFocus={onHover}
          onBlur={onBlur}
        >
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
  }
}

export default withStyles(styles)(ProductItem);
