import React from "react";

import { browserHistory } from "react-router";

import * as RecordsActions from "../../actions/RecordsActions";

import SellersStore from "../../stores/SellersStore";
import * as SellersActions from "../../actions/SellersActions";

import Select from "./Select";

import Validator from "../../utils/formUtils";

export default class AddProduct extends React.Component {
  constructor() {
    super();
    this.handleFileInput = this.handleFileInput.bind( this );
    this.checkValidity = this.checkValidity.bind( this );
    this.submit = this.submit.bind( this );
    this.getSellers = this.getSellers.bind( this );
    this.state = {
      inputFileText: "<i class=\"material-icons\">file_upload</i> Wybierz pliki...",
      sellers: [],
      places: [],
    };

    this.inputs = {};
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
      inputFileText: this.state.inputFileText,
      sellers: SellersStore.getAllSellers(),
      places: SellersStore.getAllPlaces(),
    } );
  }

  handleFileInput( e ) {
    let text = `Wybrano ${e.target.files.length} `;
    if ( e.target.files.length === 0 ) {
      text = "<i class=\"material-icons\">file_upload</i> Wybierz pliki...";
    } else if ( e.target.files.length === 1 ) {
      text += "plik";
    } else if ( e.target.files.length < 5 ) {
      text += "pliki";
    } else {
      text += "plików";
    }

    this.setState( {
      inputFileText: text,
    } );
  }

  submit() {
    const oData = new FormData();

    oData.append( "Product", this.inputs.product.value );
    oData.append( "Place", this.inputs.place.id() );
    oData.append( "Seller", this.inputs.seller.id() );
    oData.append( "Date", this.inputs.date.value );
    oData.append( "Warranty-length", this.inputs.warranty.value() );
    oData.append( "Notes", this.inputs.notes.value );

    const filesLength = this.inputs.files.files.length;

    for ( let i = 0; i < filesLength; i++ ) {
      oData.append( `File${i}`, this.inputs.files.files[i] );
    }

    if ( this.checkValidity( true ) ) {
      RecordsActions.createRecord( oData, ( oReq ) => {
        console.log( JSON.parse( oReq.response ) );

        browserHistory.push( "/" );
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
    const places = [];

    this.state.places.forEach( ( v ) => {
      places.push( { text: v.name, id: v.id, nip: v.nip } );
    } );

    places.sort( ( a, b ) => {
      return a.text.toLowerCase().localeCompare( b.text.toLowerCase() );
    } );

    const sellers = [];

    this.state.sellers.forEach( ( v ) => {
      sellers.push( { text: v.name, id: v.id, nip: v.nip } );
    } );

    sellers.sort( ( a, b ) => {
      return a.text.toLowerCase().localeCompare( b.text.toLowerCase() );
    } );

    const warrantyLengthsOptions = [
      { text: "1 rok" },
      { text: "2 lata" },
      { text: "3 lata" },
      { text: "4 lata" },
      { text: "5 lat" },
      { text: "6 lat" },
      { text: "7 lat" },
      { text: "8 lat" },
      { text: "9 lat" },
      { text: "10 lat" },
    ];

    const searchFunction = ( targetValue, searchValue ) => {
      return ( searchValue === "" ) || ( targetValue.text.toLowerCase().indexOf( searchValue.toLowerCase() ) >= 0 ) || ( targetValue.nip.indexOf( searchValue ) >= 0 );
    };

    return (
      <main className="card">
        <form encType="multipart/form-data" name="test">
          <div className="form-group">
            <textarea required onFocus={this.touched} onChange={this.checkValidity} ref={( input ) => { this.inputs.product = input; }} rows="1" type="text" id="product" />
            <label htmlFor="product">Produkt</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <Select required id="seller" onChange={this.checkValidity} link={{ url: "/add-seller", text: "+ Dodaj sprzedawcę" }} search options={sellers} ref={( input ) => { this.inputs.seller = input; }} searchFunction={searchFunction} />
            <label htmlFor="seller">Miejsce zakupu</label>
          </div>
          <div className="form-group">
            <Select required id="place" onChange={this.checkValidity} link={{ url: "/add-seller", text: "+ Dodaj sprzedawcę" }} search options={places} ref={( input ) => { this.inputs.place = input; }} searchFunction={searchFunction} />
            <label htmlFor="seller">Dane sprzedawcy</label>
          </div>
          <div className="form-group">
            <input required onChange={this.checkValidity} ref={( input ) => { this.inputs.date = input; }} type="date" id="date" />
            <label htmlFor="date">Data zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <Select required id="warranty-length" options={warrantyLengthsOptions} defaultValue="2 lata" ref={( input ) => { this.inputs.warranty = input; }} />
            <label htmlFor="warranty-length">Okres gwarancji</label>
          </div>
          <div className="form-group">
            <textarea ref={( input ) => { this.inputs.notes = input; }} type="text" id="notes" />
            <label htmlFor="notes">Notatki</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <label htmlFor="files">Załączniki</label>
            <input ref={( input ) => { this.inputs.files = input; }} onChange={this.handleFileInput} type="file" name="files" id="files" multiple />
            <label htmlFor="files" className="btn raised" dangerouslySetInnerHTML={{ __html: this.state.inputFileText }} />
          </div>
          <p>* – pola wymagane</p>
          <button type="button" onClick={this.submit} className="btn raised submit">Zapisz</button>
        </form>
      </main>
    );
  }
}
