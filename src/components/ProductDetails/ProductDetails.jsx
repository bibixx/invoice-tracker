import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { fullProductPropTypes } from 'src/propTypes/productPropTypes';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Page from 'src/components/shared/Page/Page';
import Typography from '@material-ui/core/Typography';

import { getProductById as getProductByIdAction } from 'src/actions/products';

import format from 'date-fns/format';

import CompanyPreview from './CompanyPreview/CompanyPreview';
import Attachment from './Attachment/Attachment';
import Warranty from './Warranty/Warranty';

import styles from './ProductDetails.styles';

class ProductDetails extends Component {
  static propTypes = {
    getProductById: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    product: fullProductPropTypes,
  }

  static defaultProps = {
    product: null,
  }

  componentDidMount() {
    const {
      getProductById,
      match: { params: { id } },
    } = this.props;

    getProductById(id);
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

          <section className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Bought at
            </Typography>
            <Typography variant="body1" gutterBottom>
              {format(new Date(product.timestamp), 'DD.MM.YYYY')}
            </Typography>
          </section>

          <section className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Warranty
            </Typography>
            <Warranty product={product} />
          </section>

          <section className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Place of purchase
            </Typography>

            <Grid container spacing={24}>
              <CompanyPreview company={product.placeOfPurchase} />
            </Grid>
          </section>

          <section className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Seller
            </Typography>

            <Grid container spacing={24}>
              <CompanyPreview company={product.seller} isSeller />
            </Grid>
          </section>

          <section className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Attachments
            </Typography>
            <Grid container spacing={24}>
              {product.attachments.map(image => (
                <Attachment image={image} key={image.id} />
              ))}
            </Grid>
          </section>
        </Paper>
      </Page>
    );
  }
}

const mapStateToProps = ({ products: { products } }, { match: { params: { id } } }) => ({
  product: products.find(product => product.id === id),
});

const mapDispatchToProps = dispatch => ({
  getProductById: id => dispatch(getProductByIdAction(id)),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(
    withRouter(ProductDetails),
  ),
);
