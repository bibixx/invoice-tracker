import PropTypes from 'prop-types';

export const fullOrganizationPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  streetAddress: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  isPlaceOfPurchase: PropTypes.bool.isRequired,
  isSeller: PropTypes.bool.isRequired,
});

export const fullProductPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  warrantyLength: PropTypes.number.isRequired,
  placeOfPurchase: fullOrganizationPropTypes,
  seller: fullOrganizationPropTypes,
});

export const listProductPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  warrantyLength: PropTypes.number.isRequired,
});
