import React from "react";
import PropTypes from "prop-types";

import Checkbox from "./Form/Checkbox";

export default class Seller extends React.Component {
  render() {
    const seller = this.props.seller;

    return (
      <div className="detail-view__content">
        <small className="detail-label">Nazwa firmy</small>
        <p>{ seller.name }</p>
        <small className="detail-label">Kod pocztowy</small>
        <p>{ seller.zip }</p>
        <small className="detail-label">Miasto</small>
        <p>{ seller.city }</p>
        <small className="detail-label">Ulica</small>
        <p>{ seller.street }</p>
        <small className="detail-label">NIP</small>
        <p>{ seller.nip }</p>
        <Checkbox checked={ seller.isPlace } disabled>Miejsce sprzedaży</Checkbox>
        <Checkbox checked={ seller.isSeller } disabled>Sprzedawca</Checkbox>
      </div>
    );
  }
}

Seller.propTypes = {
  seller: PropTypes.object,
};

Seller.defaultProps = {
  seller: {},
};
