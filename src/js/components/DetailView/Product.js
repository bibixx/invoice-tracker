import React from "react";
import { Link } from "react-router";

import { calculateWarrantyLeft, formatDate } from "../../utils/dateUtils";

import SellersStore from "../../stores/SellersStore";
import * as SellersActions from "../../actions/SellersActions";

export default class Product extends React.Component {
  constructor() {
    super();
    this.getSellers = this.getSellers.bind( this );
    this.state = {
      seller: {},
      place: {},
    };
  }

  componentWillMount() {
    SellersStore.on( "change", this.getSellers );
    SellersActions.syncSellers();
  }

  componentWillUnmount() {
    SellersStore.removeListener( "change", this.getSellers );
  }

  getSellers() {
    this.setState( {
      seller: SellersStore.getById( this.props.record.seller ),
      place: SellersStore.getById( this.props.record.place ),
    } );
  }

  render() {
    const warrantyLeft = calculateWarrantyLeft( this.props.record.date, this.props.record.warrantyLength, true );
    const notes = () => {
      if ( this.props.record.notes === "" ) {
        return null;
      }

      return (
        <div className="notes">
          <small className="label">Notatki</small>
          <p>{this.props.record.notes}</p>
        </div>
      );
    };

    const attachements = () => {
      if ( !this.props.record.attachements ) {
        this.props.record.attachements = [];
      }

      if ( this.props.record.attachements.length > 1 ) {
        const attArray = [];
        const attch = this.props.record.attachements;
        for ( let x = 1; x < attch.length; x++ ) {
          const v = attch[0] + attch[x];
          const i = x - 1;
          attArray.push( <a href={v} alt="Załącznik" rel="noopener noreferrer" target="_blank" className="attachement" key={i}><i className="material-icons">picture_as_pdf</i></a> );
        }

        return (
          <div className="attachements">
            <small className="label">Załączniki</small>
            {attArray}
          </div>
        );
      }

      return null;
    };

    return (
      <main className={`card display-more ${warrantyLeft.status}`}>
        <small className="label">Produkt</small>
        <p>{this.props.record.name}</p>

        <small className="label">Miejsce zakupu</small>
        <p><Link to={`/seller/${this.state.place.id}`}>{this.state.place.name}</Link></p>

        <small className="label">Dane sprzedawcy</small>
        <p><Link to={`/seller/${this.state.seller.id}`}>{this.state.seller.name}</Link></p>

        <small className="label">Data zakupu</small>
        <p>{formatDate( this.props.record.date )}</p>

        { notes() }

        <small className="label">Okres gwarancji</small>
        <p className="date">{warrantyLeft.text}</p>

        { attachements() }
      </main>
    );
  }
}

Product.propTypes = {
  record: React.PropTypes.object,
};
