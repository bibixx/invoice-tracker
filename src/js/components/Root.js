import React from "react";
import RecordsStore from "../stores/RecordsStore";
import * as RecordsActions from "../actions/RecordsActions";

import ListItem from "./Root/ListItem";

export default class Root extends React.Component {
  constructor() {
    super();
    this.getRecords = this.getRecords.bind( this );
    this.state = {
      records: RecordsStore.getAll(),
    };
  }

  componentWillMount() {
    RecordsStore.on( "change", this.getRecords );
    RecordsActions.syncRecords();
  }

  componentWillUnmount() {
    RecordsStore.removeListener( "change", this.getRecords );
  }

  getRecords() {
    this.setState( {
      records: RecordsStore.getAll(),
    } );
  }

  render() {
    let records = [];
    let mainClass = null;
    let header = (
      <header>
        <div id="category">Produkty</div>
        <div id="sort">
          <i className="material-icons">arrow_downward</i>
          <span>DATA ZAKUPU</span>
        </div>
      </header>
    );

    this.state.records.forEach( ( v ) => {
      records.push( <ListItem key={v.id} record={v} /> );
    } );

    if ( records.length <= 0 ) {
      records = ( <h1>Nie znaleziono produktów<br />Aby dodać produkt naciśnij +</h1> );
      header = null;
      mainClass = "not-found";
    }

    return (
      <main id="root-view" className={mainClass}>
        {header}
        {records}
      </main>
    );
  }
}
