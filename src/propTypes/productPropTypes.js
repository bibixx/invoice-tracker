import PropTypes from 'prop-types';

import { fullCompanyPropTypes } from './companyPropTypes';

export const fullProductPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  warrantyLength: PropTypes.number.isRequired,
  placeOfPurchase: fullCompanyPropTypes,
  seller: fullCompanyPropTypes,
});

export const listProductPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  warrantyLength: PropTypes.number.isRequired,
});
