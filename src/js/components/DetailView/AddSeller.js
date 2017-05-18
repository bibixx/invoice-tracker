import React from "react";
// import PropTypes from "prop-types";

import Validator from "../../Validator";
import Input from "./Form/Input";
import Checkbox from "./Form/Checkbox";

export default class AddSeller extends React.Component {
  constructor() {
    super();
    this.Validator = new Validator();
  }

  onSubmit() {
    console.info( "Sent!" );
  }

  render() {
    const isNip = ( nipNo ) => {
      const nip = nipNo.split( "" );
      const wages = [6, 5, 7, 2, 3, 4, 5, 6, 7, 0];
      let sum = 0;
      nip.forEach( ( v, i ) => {
        sum += v * wages[ i ];
      } );

      return String( sum % 11 ) === nip[ nip.length - 1 ];
    };

    return (
      <div className="detail-view__content detail-view__content--edit">
        <form>
          <Input id="name" required validator={ this.Validator }>Nazwa firmy</Input>
          <Input id="zip" required validator={ this.Validator } pattern="\d{2}-\d{3}">Kod pocztowy</Input>
          <Input id="city" required validator={ this.Validator }>Miasto</Input>
          <Input id="street" required validator={ this.Validator }>Ulica</Input>
          <Input id="nip" required validator={ this.Validator } pattern="\d{10}" testFunction={ isNip }>NIP</Input>
          <Checkbox id="isSeller">Sprzedawca</Checkbox>
          <Checkbox id="isPlace">Miejsce sprzedaży</Checkbox>
          <p>* – pola wymagane</p>
          <button type="button" onClick={ e => this.Validator.submit( e, this.onSubmit ) } className="material-button material-button--raised">Zapisz</button>
        </form>
      </div>
    );
  }
}
