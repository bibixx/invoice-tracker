import React from "react";

import { browserHistory } from "react-router";

export default class AddProduct extends React.Component {
  constructor() {
    super();
    this.handleFileInput = this.handleFileInput.bind( this );
    this.submit = this.submit.bind( this );
    this.state = {
      inputFileText: "<i class=\"material-icons\">file_upload</i> Wybierz pliki...",
    };

    this.inputs = {};
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
    const form = this.form;
    const oData = new FormData( form );

    oData.append( "Product", this.inputs.product.value );
    oData.append( "Place", this.inputs.place.value );
    oData.append( "Seller", this.inputs.seller.value );
    oData.append( "Date", this.inputs.date.value );
    oData.append( "Warranty-length", this.inputs.warranty.value );
    oData.append( "Notes", this.inputs.notes.value );

    const filesLength = this.inputs.files.files.length;

    for ( let i = 0; i < filesLength; i++ ) {
      oData.append( `File${i}`, this.inputs.files.files[i] );
    }

    const oReq = new XMLHttpRequest();
    oReq.open( "POST", "http://localhost:80", true );
    oReq.onload = () => {
      console.log( JSON.parse( oReq.response ) );
      // console.log( oReq.response );
      browserHistory.push( "/" );
    };

    oReq.send( oData );
  }

  render() {
    return (
      <main className="card">
        <form ref={( form ) => { this.form = form; }} encType="multipart/form-data" name="test">
          <div className="form-group">
            <textarea ref={( input ) => { this.inputs.product = input; }} rows="1" type="text" id="product" />
            <label htmlFor="product">Produkt</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea ref={( input ) => { this.inputs.place = input; }} rows="1" type="text" id="place" />
            <label htmlFor="place">Miejsce zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea ref={( input ) => { this.inputs.seller = input; }} rows="1" type="text" id="seller" />
            <label htmlFor="seller">Dane sprzedawcy</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <input ref={( input ) => { this.inputs.date = input; }} type="date" id="date" />
            <label htmlFor="date">Data zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <div className="select">
              <select ref={( input ) => { this.inputs.warranty = input; }} id="warranty-length">
                <option>1 rok</option>
                <option defaultValue>2 lata</option>
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
          <button type="button" onClick={this.submit} className="btn raised submit">Zapisz</button>
        </form>
      </main>
    );
  }
}
