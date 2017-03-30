import React from "react";

import { browserHistory } from "react-router";

import * as RecordsActions from "../../actions/RecordsActions";

import SellersStore from "../../stores/SellersStore";
import * as SellersActions from "../../actions/SellersActions";

import Select from "./Select";

import Validator from "../../utils/formUtils";
import { yearDeclination } from "../../utils/dateUtils";

export default class AddProduct extends React.Component {
  constructor( props ) {
    super( props );
    this.handleFileInput = this.handleFileInput.bind( this );
    this.checkValidity = this.checkValidity.bind( this );
    this.submitRemove = this.submitRemove.bind( this );
    this.submitCreate = this.submitCreate.bind( this );
    this.getSellers = this.getSellers.bind( this );
    this.submit = this.submit.bind( this );
    this.state = {
      inputFileText: "<i class=\"material-icons\">file_upload</i> Wybierz pliki...",
      sellers: [],
      places: [],
      record: this.props.record || {},
    };

    this.inputs = {};
  }

  componentWillMount() {
    SellersStore.on( "change", this.getSellers );
    SellersActions.syncSellers();
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( Object.assign( this.state, {
      record: nextProps.record || {},
    } ) );
  }

  componentWillUnmount() {
    SellersStore.removeListener( "change", this.getSellers );
  }

  getSellers() {
    this.setState( {
      inputFileText: this.state.inputFileText,
      sellers: SellersStore.getAllSellers(),
      places: SellersStore.getAllPlaces(),
      record: this.props.record || {},
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
    oData.append( "Place", this.inputs.place.getValue().id );
    oData.append( "Seller", this.inputs.seller.getValue().id );
    oData.append( "Date", this.inputs.date.value );
    oData.append( "Warranty-length", this.inputs.warranty.getValue().text );
    oData.append( "Notes", this.inputs.notes.value );

    if ( !this.props.edit ) {
      const filesLength = this.inputs.files.files.length;

      for ( let i = 0; i < filesLength; i++ ) {
        oData.append( `File${i}`, this.inputs.files.files[i] );
      }
    }

    if ( this.checkValidity( true ) ) {
      if ( this.props.edit ) {
        this.submitEdit( oData );
      } else {
        this.submitCreate( oData );
      }
    }
  }

  submitCreate( oData ) {
    RecordsActions.createRecord( oData, ( oReq ) => {
      console.log( JSON.parse( oReq.response ) );

      browserHistory.push( "/" );
    } );
  }

  submitRemove() {
    if ( confirm( "Czy napewno chesz usunąć ten rekord? Ta operacja jest nieodwracalna!" ) ) {
      RecordsActions.removeRecord( this.props.record.id, () => {
        browserHistory.push( "/" );
      } );
    }
  }

  submitEdit( oData ) {
    RecordsActions.editRecord( this.props.record.id, oData, () => {
      browserHistory.push( "/" );
    } );
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
    const places = this.state.places.map( ( v ) => {
      return Object.assign( { text: v.name }, v );
    } );

    places.sort( ( a, b ) => {
      return a.text.toLowerCase().localeCompare( b.text.toLowerCase() );
    } );

    const sellers = this.state.sellers.map( ( v ) => {
      return Object.assign( { text: v.name }, v );
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

    const record = this.state.record;

    if ( Object.keys( record ).length <= 0 && this.props.edit ) {
      return null;
    }

    let warrantySelectVal = { text: "2 lata" };

    if ( this.props.edit ) {
      warrantySelectVal = { text: `${record.warrantyLength} ${yearDeclination( record.warrantyLength )}` };
    }

    let sellerName = "";

    this.state.sellers.forEach( ( v ) => {
      if ( v.id === record.seller ) {
        sellerName = v.name;
      }
    } );

    let placeName = "";

    this.state.places.forEach( ( v ) => {
      if ( v.id === record.place ) {
        placeName = v.name;
      }
    } );

    let attachements = null;

    if ( !this.props.edit ) {
      attachements = ( <div className="form-group">
        <label htmlFor="files">Załączniki</label>
        <input ref={( input ) => { this.inputs.files = input; }} onChange={this.handleFileInput} type="file" name="files" id="files" multiple />
        <label htmlFor="files" className="btn raised" dangerouslySetInnerHTML={{ __html: this.state.inputFileText }} />
      </div> );
    }

    let deleteRecord = null;

    if ( this.props.edit ) {
      deleteRecord = ( <button type="button" className="btn raised submit remove" onClick={this.submitRemove}>Usuń</button> );
    }

    return (
      <main className="card">
        <form encType="multipart/form-data" name="test">
          <div className="form-group">
            <textarea defaultValue={record.name} required onFocus={this.touched} onChange={this.checkValidity} ref={( input ) => { this.inputs.product = input; }} rows="1" type="text" id="product" />
            <label htmlFor="product">Produkt</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <Select defaultValue={{ id: record.place, text: placeName }} id="place" link={{ url: "/add-seller", text: "+ Dodaj sprzedawcę" }} onChange={this.checkValidity} options={places} ref={( input ) => { this.inputs.place = input; }} required search searchFunction={searchFunction} />
            <label htmlFor="place">Miejsce zakupu</label>
          </div>
          <div className="form-group">
            <Select defaultValue={{ id: record.seller, text: sellerName }} id="seller" link={{ url: "/add-seller", text: "+ Dodaj sprzedawcę" }} onChange={this.checkValidity} options={sellers} ref={( input ) => { this.inputs.seller = input; }} required search searchFunction={searchFunction} />
            <label htmlFor="seller">Dane sprzedawcy</label>
          </div>
          <div className="form-group">
            <input defaultValue={record.date} required onChange={this.checkValidity} ref={( input ) => { this.inputs.date = input; }} type="date" id="date" pattern="\d{4}-\d{2}-\d{2}" />
            <label htmlFor="date">Data zakupu</label>
            <div className="border" />
          </div>
          <div className="form-group">
            <Select defaultValue={warrantySelectVal} required id="warranty-length" options={warrantyLengthsOptions} ref={( input ) => { this.inputs.warranty = input; }} />
            <label htmlFor="warranty-length">Okres gwarancji</label>
          </div>
          <div className="form-group">
            <textarea defaultValue={record.notes} ref={( input ) => { this.inputs.notes = input; }} type="text" id="notes" />
            <label htmlFor="notes">Notatki</label>
            <div className="border" />
          </div>
          { attachements }
          <p>* – pola wymagane</p>
          <button type="button" onClick={this.submit} className="btn raised submit">Zapisz</button>
          {deleteRecord}
        </form>
      </main>
    );
  }
}

AddProduct.propTypes = {
  record: React.PropTypes.object,
  edit: React.PropTypes.bool,
};
