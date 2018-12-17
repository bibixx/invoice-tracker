import React from 'react';

import { Link } from 'react-router-dom';
import URLS from 'src/constants/urls';

import Typography from '@material-ui/core/Typography';

import Page from 'src/components/shared/Page/Page';

const ProductDetails = () => (
  <Page>
    <Link to={URLS.products()}>
      <Typography variant="body1">
        Products
      </Typography>
    </Link>
  </Page>
);

export default ProductDetails;
