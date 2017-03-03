import React from "react";

import { calculateWarrantyLeft, formatDate } from "../../utils/dateUtils";

export default class Product extends React.Component {
  render() {
    const warrantyLeft = calculateWarrantyLeft( this.props.record.date, this.props.record.warrantyLength, true );
    const notes = () => {
      if ( this.props.record.notes === "" ) {
        return null;
      }

      return (
        <div className="notes">
          <small className="label">Uwagi</small>
          <p>{this.props.record.notes}</p>
        </div>
      );
    };

    const attachements = () => {
      if ( this.props.record.attachements.length > 0 ) {
        const attArray = [];
        this.props.record.attachements.forEach( ( v, i ) => {
          const style = {
            backgroundImage: `url(${v.url})`,
          };

          attArray.push( <div alt="Załącznik" className="attachement" key={i} style={style} /> );
        } );

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
      <main className={`card ${warrantyLeft.status}`}>
        <small className="label">Produkt</small>
        <p>{this.props.record.name}</p>

        <small className="label">Miejsce zakupu</small>
        <p><a href="#">{this.props.record.place}</a></p>

        <small className="label">Dane sprzedawcy</small>
        <p><a href="#">{this.props.record.place}</a></p>

        <small className="label">Data zakupu</small>
        <p>{formatDate( this.props.record.date )}</p>

        { notes()}

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
