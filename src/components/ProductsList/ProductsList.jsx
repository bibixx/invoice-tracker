import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listProductPropTypes } from 'src/propTypes/productPropTypes';

import { getProducts as getProductsAction } from 'src/actions/products';

import Grid from '@material-ui/core/Grid';

import Page from 'src/components/shared/Page/Page';

import ProductItem from './ProductItem/ProductItem';

class ProductsList extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(listProductPropTypes).isRequired,
  }

  componentDidMount() {
    const { getProducts } = this.props;

    getProducts(0);
  }

  render() {
    const { products } = this.props;

    return (
      <Page>
        <Grid container spacing={24}>
          {products.map(product => (
            <ProductItem product={product} key={product.id} />
          ))}
        </Grid>
      </Page>
    );
  }
}

const mapStateToProps = ({
  products: { products, productsLoaded, numberOfPages },
}) => ({ products, productsLoaded, numberOfPages });

const mapDispatchToProps = dispatch => ({
  getProducts: page => dispatch(getProductsAction(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
