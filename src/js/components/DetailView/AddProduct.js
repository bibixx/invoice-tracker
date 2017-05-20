import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addRecord, editRecord } from "../../actions/RecordsActions";

import { getById } from "../../utils/RecordUtils";
import { formatDateForHTML } from "../../utils/DateUtils";

import Validator from "../../Validator";
import Input from "./Form/Input";
import Select from "./Form/Select";

@connect()

export default class AddProduct extends React.Component {
  constructor() {
    super();
    this.Validator = new Validator();
    this.inputs = {};
    this.addElement = this.addElement.bind( this );
    this.addInput = this.addInput.bind( this );
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onSubmit() {
    const inputs = this.inputs;
    const formData = new FormData();
    const oldFiles = [];

    for ( const prop in inputs ) {
      if ( inputs.hasOwnProperty( prop ) ) {
        const input = inputs[ prop ];

        switch ( prop ) {
          case "name":
          case "notes":
          case "warrantyDate":
            formData.append( prop, input.value );
            break;
          case "warrantyLength":
            formData.append( prop, input.options[ input.selectedIndex ].value * 1 );
            break;
          case "place":
          case "seller":
            formData.append( prop, input.options[ input.selectedIndex ].id );
            break;
          case "attachements": {
            for ( let i = 0; i < input.files.length; i++ ) {
              const file = input.files[ i ];

              formData.append( `files-${ i }`, file, file.name );
            }
            break;
          }

          default: {
            const match = prop.match( /^attachement-.+?-(\d+)$/ );
            if ( match && !input.checked ) {
              oldFiles.push( this.props.record.files[ match[ 1 ] * 1 ] );
            }
          }
        }
      }
    }

    // console.group( "FormData details" );
    // for ( const pair of formData.entries() ) {
    //   console.log( `${ pair[ 0 ] }: ${ pair[ 1 ] }` );
    // }
    // console.groupEnd();

    if ( this.props.edit ) {
      formData.append( "id", this.props.record.id );
      formData.append( "oldFiles", JSON.stringify( oldFiles ) );
      this.props.dispatch( editRecord( formData ) );
    } else {
      this.props.dispatch( addRecord( formData ) );
    }

    this.sent = true;
    browserHistory.push( "/" );
  }

  addElement( i ) {
    if ( !this.unmounting ) {
      this.inputs[ i.input.id ] = i.input;
    }
  }

  addInput( i ) {
    if ( !this.unmounting ) {
      this.inputs[ i.id ] = i;
    }
  }

  render() {
    const placesArray = this.props.sellers.filter( v => v.isPlace ).map( ( v ) => { return { text: v.name, id: v.id }; } ).sort( ( a, b ) => a.text.localeCompare( b.text ) );
    const sellersArray = this.props.sellers.filter( v => v.isSeller ).map( ( v ) => { return { text: v.name, id: v.id }; } ).sort( ( a, b ) => a.text.localeCompare( b.text ) );

    const record = this.props.record;

    const attachements = [];

    if ( this.props.edit ) {
      for ( let i = 1; i < record.files.length; i++ ) {
        attachements.push( <input ref={ this.addInput } key={ `attachement-${ record.id }-${ i }-input` } id={ `attachement-${ record.id }-${ i }` } className="detail-attachements__input" type="checkbox" /> );
        attachements.push( <label key={ `attachement-${ record.id }-${ i }-label` } htmlFor={ `attachement-${ record.id }-${ i }` } className="detail-attachements__file" style={ { backgroundImage: `url(${ record.files[ 0 ] }${ record.files[ i ] })` } }>Image</label> );
      }
    }

    const attachementsContainer = ( <div className="detail-attachements">{ attachements }</div> );

    return (
      <div className="detail-view__content detail-view__content--edit">
        <form>
          <Input ref={ this.addElement } id="name" required validator={ this.Validator } value={ record.name }>Produkt</Input>
          <Select ref={ this.addElement } id="place" options={ placesArray } value={ this.props.edit ? getById( record.place, this.props.sellers ).name : null } required>Miejsce zakupu</Select>
          <Select ref={ this.addElement } id="seller" options={ sellersArray } value={ this.props.edit ? getById( record.seller, this.props.sellers ).name : null } required>Dane sprzedawcy</Select>
          <Input ref={ this.addElement } id="warrantyDate" type="date" required validator={ this.Validator } value={ this.props.edit ? formatDateForHTML( record.warrantyDate ) : null } pattern="\d{4}-\d{2}-\d{2}">Data zakupu</Input>
          <Select ref={ this.addElement } id="warrantyLength" options={ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } value={ this.props.edit ? record.warrantyLength : 2 } required>Okres gwarancji</Select>
          <Input ref={ this.addElement } id="notes" type="textarea" validator={ this.Validator } value={ this.props.edit ? record.notes : null }>Notatki</Input>
          <Input ref={ this.addElement } id="attachements" type="file" multiple validator={ this.Validator }>Załączniki</Input>
          { ( attachements.length > 0 ) ? ( <small className="detail-label">Załączniki</small> ) : null }
          { ( attachements.length > 0 ) ? attachementsContainer : null }
          <p>* – pola wymagane</p>
          <button type="button" onClick={ e => this.Validator.submit( e, this.onSubmit.bind( this ) ) } className="material-button material-button--raised">Zapisz</button>
        </form>
      </div>
    );
  }
}

AddProduct.propTypes = {
  sellers: PropTypes.array,
  dispatch: PropTypes.func,
  record: PropTypes.object,
  edit: PropTypes.bool,
};

AddProduct.defaultProps = {
  record: {},
  sellers: [],
  dispatch: () => {},
  edit: false,
};
