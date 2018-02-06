import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import { formatDate } from "../../utils/dateUtils";
import { yearDeclination } from "../../utils/LangUtils";

export default class Product extends React.Component {
  render() {
    const record = this.props.record;
    const date = record.warrantyDate;
    const endingDate = new Date( date.getFullYear() + record.warrantyLength, date.getMonth(), date.getDate() );
    const difference = ( ( endingDate - new Date() ) / 1000 / 60 / 60 / 24 / 365 ).toFixed( 1 );
    const warrantyState = ( difference <= 0 ) ? "over" : ( difference > 0.5 ) ? "valid" : "warning";
    const attachements = [];

    for ( let i = 1; i < record.files.length; i++ ) {
      attachements.push( <a key={ `attachement-${ record.id }-${ i }` } href={ record.files[ 0 ] + record.files[ i ] } target="_blank" rel="noopener noreferrer" className="detail-attachements__file" style={ { backgroundImage: `url(${ record.files[ 0 ] }${ record.files[ i ] })` } }>Image</a> );
    }

    const attachementsContainer = ( <div className="detail-attachements">{ attachements }</div> );

    return (
      <div className="detail-view__content">
        <small className="detail-label">Produkt</small>
        <p>{ record.name }</p>

        <small className="detail-label">Miejsce zakupu</small>
        <p>
          <Link to={ `/seller/${ this.props.place.id }` }>{ this.props.place.name }</Link>
          <br />
          <small>{ `${ this.props.place.zip } ${ this.props.place.city }, ${ this.props.place.street }` }</small>
        </p>

        <small className="detail-label">Dane sprzedawcy</small>
        <p>
          <Link to={ `/seller/${ this.props.seller.id }` }>{ this.props.seller.name }</Link>
          <br />
          <small>{ `${ this.props.seller.zip } ${ this.props.seller.city }, ${ this.props.seller.street }, NIP: ${ this.props.seller.nip }` }</small>
        </p>

        <small className="detail-label">Data zakupu</small>
        <p>{ formatDate( record.warrantyDate ) }</p>

        <small className="detail-label">Okres gwarancji</small>
        <p className={ `detail-date detail-date--${ warrantyState }` }>{ `${ yearDeclination( record.warrantyLength ) } (${ yearDeclination( Math.abs( difference ) ) })` }</p>

        { ( attachements.length > 0 ) ? ( <small className="detail-label">Załączniki</small> ) : null }
        { ( attachements.length > 0 ) ? attachementsContainer : null }
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
