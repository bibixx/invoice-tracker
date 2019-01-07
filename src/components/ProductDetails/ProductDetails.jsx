import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';
import URLS from 'src/constants/urls';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Page from 'src/components/shared/Page/Page';
import Typography from '@material-ui/core/Typography';

import PictureAsPdf from '@material-ui/icons/PictureAsPdf';

import { getProductById } from 'src/actions/products';

import addYears from 'date-fns/add_years';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import format from 'date-fns/format';

import styles from './ProductDetails.styles';

class ProductDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductById(id);
  }

  render() {
    const { classes, product } = this.props;

    if (!product) {
      return null;
    }

    return (
      <Page>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Bought at
            {' '}
            {format(new Date(product.timestamp), 'DD.MM.YYYY')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Warranty length:
            {' '}
            {distanceInWordsStrict(new Date(), addYears(new Date(), product.warrantyLength))}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Place of purchase:
            {' '}
            <Link to={URLS.companyById(product.placeOfPurchase.id)}>
              {product.placeOfPurchase.name}
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Seller:
            {' '}
            <Link to={URLS.companyById(product.seller.id)}>
              {product.seller.name}
            </Link>
          </Typography>
          <Typography variant="h5" gutterBottom gutterTop>
            Attachments
          </Typography>
          <Grid container spacing={24}>
            {product.attachments.map(({ id, url }) => (
              <Grid item xs={12} sm={6} md={2} key={id}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Paper elevation={2} className={classes.attachment}>
                    <PictureAsPdf className={classes.attachmentIcon} />
                  </Paper>
                </a>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Page>
    );
  }
}

const mapStateToProps = ({ products: { products } }, { match: { params: { id } } }) => ({
  product: products.find(product => product.id === id),
});

const mapDispatchToProps = dispatch => ({
  getProductById: id => dispatch(getProductById(id)),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(
    withRouter(ProductDetails),
  ),
);
