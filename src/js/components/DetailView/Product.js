import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import { formatDate } from "../../utils/DateUtils";
import { yearDeclination } from "../../utils/LangUtils";

export default class Product extends React.Component {
  render() {
    const record = this.props.record;
    const date = record.warrantyDate;
    const endingDate = new Date( date.getFullYear() + record.warrantyLength, date.getMonth(), date.getDate() );
    const difference = ( ( endingDate - new Date() ) / 1000 / 60 / 60 / 24 / 365 ).toFixed( 1 );
    const warrantyState = ( difference <= 0 ) ? "over" : ( difference > 0.5 ) ? "valid" : "warning";

    return (
      <div className="detail-view__content">
        <small className="detail-label">Produkt</small>
        <p>{ record.name }</p>

        <small className="detail-label">Miejsce zakupu</small>
        <p><Link to={ `/seller/${this.props.place.id}` }>{ this.props.place.name }</Link></p>

        <small className="detail-label">Dane sprzedawcy</small>
        <p><Link to={ `/seller/${this.props.seller.id}` }>{ this.props.seller.name }</Link></p>

        <small className="detail-label">Data zakupu</small>
        <p>{ formatDate( record.warrantyDate ) }</p>

        <small className="detail-label">Okres gwarancji</small>
        <p className={ `detail-date detail-date--${warrantyState}` }>{ `${yearDeclination( record.warrantyLength )} (${yearDeclination( Math.abs( difference ) )})` }</p>
      </div>
    );
  }
}

Product.propTypes = {
  record: PropTypes.object,
  place: PropTypes.object,
  seller: PropTypes.object,
};

Product.defaultProps = {
  record: {},
  place: {},
  seller: {},
};
