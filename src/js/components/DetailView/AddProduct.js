import React from "react";

import { browserHistory } from "react-router";

import * as RecordsActions from "../../actions/RecordsActions";

import SellersStore from "../../stores/SellersStore";
import * as SellersActions from "../../actions/SellersActions";

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
    oData.append( "Place", this.inputs.place.selectedOptions[0].id );
    oData.append( "Seller", this.inputs.seller.selectedOptions[0].id );
    oData.append( "Date", this.inputs.date.value );
    oData.append( "Warranty-length", this.inputs.warranty.value );
    oData.append( "Notes", this.inputs.notes.value );

    const filesLength = this.inputs.files.files.length;

    for ( let i = 0; i < filesLength; i++ ) {
      oData.append( `File${i}`, this.inputs.files.files[i] );
    }

    if ( this.checkValidity( false, true ) ) {
      RecordsActions.createRecord( oData, ( oReq ) => {
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
      this.inputs.product.classList.add( "touched" );
      this.inputs.place.classList.add( "touched" );
      this.inputs.seller.classList.add( "touched" );
      this.inputs.date.classList.add( "touched" );
    }

    let valid = true;

    if ( this.inputs.date.value === "" || !( /^\d{4}-\d{2}-\d{2}$/ ).test( this.inputs.date.value ) ) {
      this.inputs.date.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.date.focus();
      }
      valid = false;
    } else {
      this.inputs.date.classList.remove( "invalid" );
    }

    if ( this.inputs.seller.value === "" ) {
      this.inputs.seller.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.seller.focus();
      }
      valid = false;
    } else {
      this.inputs.seller.classList.remove( "invalid" );
    }

    if ( this.inputs.place.value === "" ) {
      this.inputs.place.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.place.focus();
      }
      valid = false;
    } else {
      this.inputs.place.classList.remove( "invalid" );
    }

    if ( this.inputs.product.value === "" ) {
      this.inputs.product.classList.add( "invalid" );
      if ( isClick ) {
        this.inputs.product.focus();
      }
      valid = false;
    } else {
      this.inputs.product.classList.remove( "invalid" );
    }

    return valid;
  }

  render() {
    const places = [];

    this.state.places.forEach( ( v ) => {
      places.push( <option id={v.id} key={v.id}>{v.name}</option> );
    } );

    const sellers = [];

    this.state.sellers.forEach( ( v ) => {
      sellers.push( <option id={v.id} key={v.id}>{v.name}</option> );
    } );

    return (
      <main className="card">
        <form encType="multipart/form-data" name="test">
          <div className="form-group">
            <textarea onChange={this.checkValidity} ref={( input ) => { this.inputs.product = input; }} rows="1" type="text" id="product" required />
            <label htmlFor="product">Produkt</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <div className="select">
              <select onChange={this.checkValidity} ref={( input ) => { this.inputs.place = input; }} id="place">
                { places }
              </select>
              <label htmlFor="place"><i className="material-icons">arrow_drop_down</i></label>
              <div className="border" />
            </div>
            <label htmlFor="seller">Miejsce zakupu</label>
          </div>
          <div className="form-group">
            <div className="select">
              <select onChange={this.checkValidity} ref={( input ) => { this.inputs.seller = input; }} id="seller">
                { sellers }
              </select>
              <label htmlFor="seller"><i className="material-icons">arrow_drop_down</i></label>
              <div className="border" />
            </div>
            <label htmlFor="seller">Dane sprzedawcy</label>
          </div>
          <div className="form-group">
            <input onChange={this.checkValidity} ref={( input ) => { this.inputs.date = input; }} type="date" id="date" required />
            <label htmlFor="date">Data zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <div className="select">
              <select defaultValue="2 lata" onChange={this.checkValidity} ref={( input ) => { this.inputs.warranty = input; }} id="warranty-length">
                <option>1 rok</option>
                <option>2 lata</option>
                <option>3 lata</option>
                <option>4 lata</option>
                <option>5 lat</option>
                <option>6 lat</option>
                <option>7 lat</option>
                <option>8 lat</option>
                <option>9 lat</option>
                <option>10 lat</option>
              </select>
              <label htmlFor="warranty-length"><i className="material-icons">arrow_drop_down</i></label>
              <div className="border" />
            </div>
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
