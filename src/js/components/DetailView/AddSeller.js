import React from "react";

import { browserHistory } from "react-router";

import * as SellersActions from "../../actions/SellersActions";

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

    if ( this.checkValidity( false, true ) ) {
      SellersActions.createSeller( oData, ( oReq ) => {
        try {
          console.log( JSON.parse( oReq.response ) );
        } catch ( e ) {
          console.error( oReq.response );
        }

        browserHistory.push( "/" );
      } );
    }
  }

  checkValidity( e = false, isClick ) {
    if ( e !== false ) {
      e.target.classList.add( "touched" );
    }

    if ( isClick ) {
      this.inputs.name.classList.add( "touched" );
      this.inputs.city.classList.add( "touched" );
      this.inputs.street.classList.add( "touched" );
      this.inputs.zip.classList.add( "touched" );
      this.inputs.nip.classList.add( "touched" );
    }

    let valid = true;

    if ( this.inputs.nip.value === "" || !( /^\d{10}$/ ).test( this.inputs.nip.value ) ) {
      this.inputs.nip.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.nip.focus();
      }
      valid = false;
    } else {
      this.inputs.nip.classList.remove( "invalid" );
    }

    if ( this.inputs.zip.value === "" || !( /^\d{2}-\d{3}$/ ).test( this.inputs.zip.value ) ) {
      this.inputs.zip.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.zip.focus();
      }
      valid = false;
    } else {
      this.inputs.zip.classList.remove( "invalid" );
    }

    if ( this.inputs.street.value === "" ) {
      this.inputs.street.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.street.focus();
      }
      valid = false;
    } else {
      this.inputs.street.classList.remove( "invalid" );
    }

    if ( this.inputs.city.value === "" ) {
      this.inputs.city.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.city.focus();
      }
      valid = false;
    } else {
      this.inputs.city.classList.remove( "invalid" );
    }

    if ( this.inputs.name.value === "" ) {
      this.inputs.name.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.name.focus();
      }
      valid = false;
    } else {
      this.inputs.name.classList.remove( "invalid" );
    }

    return valid;
  }

  render() {
    return (
      <main className="card">
        <form encType="multipart/form-data" name="test">
          <div className="form-group">
            <textarea onChange={this.checkValidity} ref={( input ) => { this.inputs.name = input; }} rows="1" type="text" id="name" required />
            <label htmlFor="name">Nazwa firmy</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea onChange={this.checkValidity} ref={( input ) => { this.inputs.city = input; }} rows="1" type="text" id="city" required />
            <label htmlFor="city">Miasto</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea onChange={this.checkValidity} ref={( input ) => { this.inputs.street = input; }} rows="1" type="text" id="street" required />
            <label htmlFor="street">Ulica</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea onChange={this.checkValidity} ref={( input ) => { this.inputs.zip = input; }} rows="1" type="text" id="zip" required />
            <label htmlFor="zip">Kod pocztowy</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea onChange={this.checkValidity} ref={( input ) => { this.inputs.nip = input; }} rows="1" type="text" id="nip" required />
            <label htmlFor="nip">NIP</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <div className="form-checkbox">
              <input ref={( input ) => { this.inputs.isSeller = input; }} type="checkbox" id="seller" />
              <label htmlFor="seller" className="checkbox-check material-icons" />
              <label htmlFor="seller" className="checkbox-label">Sprzedawca</label>
            </div>
            <div className="form-checkbox">
              <input ref={( input ) => { this.inputs.isPlace = input; }} type="checkbox" id="place" />
              <label htmlFor="place" className="checkbox-check material-icons" />
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
