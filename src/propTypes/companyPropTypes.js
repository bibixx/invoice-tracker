import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const fullCompanyPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  streetAddress: PropTypes.string.isRequired,
  nip: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  isPlaceOfPurchase: PropTypes.bool.isRequired,
  isSeller: PropTypes.bool.isRequired,
});
