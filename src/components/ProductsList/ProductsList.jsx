import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listProductPropTypes } from 'src/propTypes/productPropTypes';

import { getProducts as getProductsAction } from 'src/actions/products';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Page from 'src/components/shared/Page/Page';

import styles from './ProductsList.styles';

class ProductsList extends Component {
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    products: PropTypes.arrayOf(listProductPropTypes).isRequired,
  }

  componentDidMount() {
    const { getProducts } = this.props;

    getProducts(0);
  }

  render() {
    const { products, classes } = this.props;

    return (
      <Page>
        <List>
          {products.map(product => (
            <ListItem button alignItems="flex-start" key={product.id} className={classes.listItem}>
              <ListItemText
                primary={product.name}
                secondary={" — I'll be in your neighborhood doing errands this…"}
              />
            </ListItem>
          ))}
        </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductsList));
