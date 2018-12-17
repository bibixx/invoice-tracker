import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listProductPropTypes } from 'src/propTypes/productPropTypes';

import { getProducts as getProductsAction } from 'src/actions/products';

import Grid from '@material-ui/core/Grid';

import Page from 'src/components/shared/Page/Page';
import Pagination from 'src/components/shared/Pagination/Pagination';

import ProductItem from './ProductItem/ProductItem';

class ProductsList extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(listProductPropTypes).isRequired,
  }

  state = {
    currentPage: 0,
  }

  componentDidMount() {
    this.getPageOfProducts();
  }

  getPageOfProducts = () => {
    const { currentPage } = this.state;
    const { getProducts } = this.props;

    getProducts(currentPage);
  }

  onNextPage = () => {
    this.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
    }), this.getPageOfProducts);
  }

  onPrevPage = () => {
    this.setState(({ currentPage }) => ({
      currentPage: currentPage - 1,
    }), this.getPageOfProducts);
  }

  render() {
    const { products, numberOfPages } = this.props;
    const { onNextPage, onPrevPage } = this;
    const { currentPage } = this.state;

    return (
      <Page>
        <Grid container spacing={24}>
          {products.map(product => (
            <ProductItem product={product} key={product.id} />
          ))}
        </Grid>
        <Pagination
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          currentPage={currentPage}
          totalPages={numberOfPages}
        />
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
