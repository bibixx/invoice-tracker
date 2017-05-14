import React from "react";
import PropTypes from "prop-types";

import Validator from "../../Validator";
import Input from "./Form/Input";

export default class AddProduct extends React.Component {
  onSubmit() {
    console.info( "Sent!" );
  }

  render() {
    return (
      <div className="detail-view__content detail-view__content--edit">
        <form>
          <Input id="product" required>Produkt</Input>
          <Input id="place" required>Miejsce zakupu</Input>
          <Input id="seller" required>Dane sprzedawcy</Input>
          <Input id="date" type="date" required>Data zakupu</Input>
          <Input id="warrantyLength" required>Okres gwarancji</Input>
          <Input id="notes" type="textarea">Notatki</Input>
          <Input id="attachements" type="file" multiple>Załączniki</Input>
          <p>* – pola wymagane</p>
          <button type="button" onClick={ e => Validator.submit( e, this.onSubmit ) } className="material-button material-button--raised">Zapisz</button>
        </form>
      </div>
    );
  }
}

AddProduct.propTypes = {
  record: PropTypes.object,
};
