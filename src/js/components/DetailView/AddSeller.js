import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addSeller, editSeller } from "../../actions/SellersActions";

import Validator from "../../Validator";
import Input from "./Form/Input";
import Checkbox from "./Form/Checkbox";

@connect()

export default class AddSeller extends React.Component {
  constructor() {
    super();
    this.Validator = new Validator();
    this.inputs = {};
    this.addElement = this.addElement.bind( this );
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onSubmit() {
    const inputs = this.inputs;
    const formData = new FormData();

    for ( const prop in inputs ) {
      if ( inputs.hasOwnProperty( prop ) ) {
        const input = inputs[ prop ];

        switch ( prop ) {
          case "name":
          case "zip":
          case "city":
          case "street":
          case "nip":
            formData.append( prop, input.value );
            break;
          case "isSeller":
          case "isPlace":
            formData.append( prop, input.checked );
            break;
          // no default
        }
      }
    }

    if ( this.props.edit ) {
      formData.append( "id", this.props.seller.id );
      this.props.dispatch( editSeller( formData ) );
    } else {
      this.props.dispatch( addSeller( formData ) );
    }
    this.sent = true;
    browserHistory.push( "/" );
  }

  addElement( i ) {
    if ( !this.unmounting ) {
      this.inputs[ i.input.id ] = i.input;
    }
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

    const seller = this.props.seller;

    return (
      <div className="detail-view__content detail-view__content--edit">
        <form>
          <Input ref={ this.addElement } id="name" required validator={ this.Validator } value={ seller.name }>Nazwa firmy</Input>
          <Input ref={ this.addElement } id="zip" required validator={ this.Validator } pattern="\d{2}-\d{3}" value={ seller.zip }>Kod pocztowy</Input>
          <Input ref={ this.addElement } id="city" required validator={ this.Validator } value={ seller.city }>Miasto</Input>
          <Input ref={ this.addElement } id="street" required validator={ this.Validator } value={ seller.street }>Ulica</Input>
          <Input ref={ this.addElement } id="nip" required validator={ this.Validator } pattern="\d{10}" testFunction={ isNip } value={ seller.nip }>NIP</Input>
          <Checkbox ref={ this.addElement } id="isSeller" checked={ seller.isSeller }>Sprzedawca</Checkbox>
          <Checkbox ref={ this.addElement } id="isPlace" checked={ seller.isPlace }>Miejsce sprzedaży</Checkbox>
          <p>* – pola wymagane</p>
          <button type="button" onClick={ e => this.Validator.submit( e, this.onSubmit.bind( this ) ) } className="material-button material-button--raised">Zapisz</button>
        </form>
      </div>
    );
  }
}

AddSeller.propTypes = {
  dispatch: PropTypes.func,
  seller: PropTypes.object,
  edit: PropTypes.bool,
};

AddSeller.defaultProps = {
  dispatch: () => {},
  seller: {},
  edit: false,
};
