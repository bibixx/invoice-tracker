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
  }

  handleFileInput( e ) {
    let text = `Wybrano ${e.target.files.length} `;
    if ( e.target.files.length === 1 ) {
      text += "plik";
    } else if ( e.target.files.length < 5 ) {
      text += "pliki";
    } else {
      text += "plików";
    }

    console.log( e.target.files );

    this.setState( {
      inputFileText: text,
    } );
  }

  submit() {
    console.log( 1 );
    browserHistory.push( "/" );
  }

  render() {
    return (
      <main className="card">
        <form ref={( form ) => { this.form = form; }}>
          <div className="form-group">
            <textarea rows="1" type="text" id="product" />
            <label htmlFor="product">Produkt</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea rows="1" type="text" id="place" />
            <label htmlFor="place">Miejsce zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <textarea rows="1" type="text" id="seller" />
            <label htmlFor="seller">Dane sprzedawcy</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <input type="date" id="date" />
            <label htmlFor="date">Data zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <div className="select">
              <select id="warranty-length">
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
            <textarea type="text" id="notes" />
            <label htmlFor="notes">Uwagi</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <label htmlFor="files">Załączniki</label>
            <input onChange={this.handleFileInput} type="file" name="files" id="files" multiple />
            <label htmlFor="files" className="btn raised" dangerouslySetInnerHTML={{ __html: this.state.inputFileText }} />
          </div>
          <button onClick={this.submit} type="button" className="btn raised submit">Zapisz</button>
        </form>
      </main>
    );
  }
}
