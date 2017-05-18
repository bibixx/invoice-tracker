import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addRecord } from "../../actions/RecordsActions";

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
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onSubmit() {
    const inputs = this.inputs;
    const dataToSubmit = {};

    dataToSubmit.id = Math.random().toString( 36 ).substring( 7 );

    for ( const prop in inputs ) {
      if ( inputs.hasOwnProperty( prop ) ) {
        const input = inputs[ prop ];

        switch ( prop ) {
          case "name":
          case "notes":
            dataToSubmit[ prop ] = input.value;
            break;
          case "warrantyLength":
            dataToSubmit[ prop ] = input.options[ input.selectedIndex ].value * 1;
            break;
          case "place":
          case "seller":
            dataToSubmit[ prop ] = input.options[ input.selectedIndex ].id;
            break;
          case "warrantyDate": {
            const dateArr = ( input.value.split( "-" ) );
            dataToSubmit[ prop ] = new Date( dateArr[ 0 ], dateArr[ 1 ] - 1, dateArr[ 2 ] );
            break;
          }
          // no default
        }
      }
    }

    this.props.dispatch( addRecord( dataToSubmit ) );
    this.sent = true;
    browserHistory.push( "/" );
  }

  addElement( i ) {
    if ( !this.unmounting ) {
      this.inputs[ i.input.id ] = i.input;
    }
  }

  render() {
    const placesArray = this.props.sellers.filter( v => v.isPlace ).map( ( v ) => { return { text: v.name, id: v.id }; } ).sort( ( a, b ) => a.text.localeCompare( b.text ) );
    const sellersArray = this.props.sellers.filter( v => v.isSeller ).map( ( v ) => { return { text: v.name, id: v.id }; } ).sort( ( a, b ) => a.text.localeCompare( b.text ) );

    return (
      <div className="detail-view__content detail-view__content--edit">
        <form>
          <Input ref={ this.addElement } id="name" required validator={ this.Validator }>Produkt</Input>
          <Select ref={ this.addElement } id="place" options={ placesArray } required>Miejsce zakupu</Select>
          <Select ref={ this.addElement } id="seller" options={ sellersArray } required>Dane sprzedawcy</Select>
          <Input ref={ this.addElement } id="warrantyDate" type="date" required validator={ this.Validator }>Data zakupu</Input>
          <Select ref={ this.addElement } id="warrantyLength" options={ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } required>Okres gwarancji</Select>
          <Input ref={ this.addElement } id="notes" type="textarea" validator={ this.Validator }>Notatki</Input>
          <Input ref={ this.addElement } id="attachements" type="file" multiple validator={ this.Validator }>Załączniki</Input>
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
};

AddProduct.defaultProps = {
  record: [],
  sellers: [],
  dispatch: () => {},
};
