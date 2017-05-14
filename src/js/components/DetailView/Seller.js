import React from "react";
import PropTypes from "prop-types";

export default class Seller extends React.Component {
  render() {
    const seller = this.props.seller;

    return (
      <div className="detail-view__content">
        <small className="detail-label">Nazwa sprzedawcy</small>
        <p>{ seller.name }</p>
      </div>
    );
  }
}

Seller.propTypes = {
  seller: PropTypes.object,
};
