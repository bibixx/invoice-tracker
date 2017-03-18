import React from "react";

import { browserHistory } from "react-router";

import * as SellersActions from "../../actions/SellersActions";

import Validator from "../../utils/formUtils";

export default class AddSeller extends React.Component {
  constructor() {
    super();
    this.checkValidity = this.checkValidity.bind( this );
    this.submit = this.submit.bind( this );
    this.state = {
      inputFileText: "<i class=\"material-icons\">file_upload</i> Wybierz pliki...",
    };

    this.inputs = {};
  }

  submit() {
    const oData = new FormData();

    oData.append( "Name", this.inputs.name.value );
    oData.append( "City", this.inputs.city.value );
    oData.append( "Street", this.inputs.street.value );
    oData.append( "Zip", this.inputs.zip.value );
    oData.append( "NIP", this.inputs.nip.value );
    oData.append( "isSeller", this.inputs.isSeller.checked );
    oData.append( "isPlace", this.inputs.isPlace.checked );

    if ( this.checkValidity( true ) ) {
      SellersActions.createSeller( oData, ( oReq ) => {
        console.log( JSON.parse( oReq.response ) );

        browserHistory.goBack();
      } );
    }
  }

  checkValidity( isClicked ) {
    if ( isClicked !== true ) {
      if ( isClicked.target.classList ) {
        isClicked.target.classList.add( "touched" );
      }
    } else {
      for ( const key in this.inputs ) {
        if ( this.inputs.hasOwnProperty( key ) ) {
          const input = this.inputs[key];
          if ( input.constructor.name === "Select" ) {
            input.isTouched( true );
          } else {
            input.classList.add( "touched" );
          }
        }
      }
    }

    const isValid = Validator.validate( this.inputs );
    if ( isValid === true ) {
      return true;
    }

    if ( isClicked === true ) {
      isValid.focus();
    }

    return false;
  }

  render() {
    return (
      <main className="card">
        <form encType="multipart/form-data" name="test">
          <div className="form-group">
            <textarea required onChange={this.checkValidity} ref={( input ) => { this.inputs.name = input; }} rows="1" type="text" id="name" />
            <label htmlFor="name">Nazwa firmy</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea required onChange={this.checkValidity} ref={( input ) => { this.inputs.city = input; }} rows="1" type="text" id="city" />
            <label htmlFor="city">Miasto</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea required onChange={this.checkValidity} ref={( input ) => { this.inputs.street = input; }} rows="1" type="text" id="street" />
            <label htmlFor="street">Ulica</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea required pattern="\d{2}-\d{3}" onChange={this.checkValidity} ref={( input ) => { this.inputs.zip = input; }} rows="1" type="text" id="zip" />
            <label htmlFor="zip">Kod pocztowy</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea data-isNIP required pattern="\d{10}" onChange={this.checkValidity} ref={( input ) => { this.inputs.nip = input; }} rows="1" type="text" id="nip" />
            <label htmlFor="nip">NIP</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <div className="form-checkbox">
              <input ref={( input ) => { this.inputs.isSeller = input; }} type="checkbox" id="seller" />
              <label htmlFor="seller" className="checkbox-check material-icons">check_box_outline_blank</label>
              <label htmlFor="seller" className="checkbox-label">Sprzedawca</label>
            </div>
            <div className="form-checkbox">
              <input ref={( input ) => { this.inputs.isPlace = input; }} type="checkbox" id="place" />
              <label htmlFor="place" className="checkbox-check material-icons">check_box_outline_blank</label>
              <label htmlFor="place" className="checkbox-label">Miejsce sprzedaży</label>
            </div>
          </div>
          <p>* – pola wymagane</p>
          <button type="button" onClick={this.submit} className="btn raised submit">Zapisz</button>
        </form>
      </main>
    );
  }
}
