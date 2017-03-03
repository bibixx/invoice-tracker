import React from "react";
import RecordsStore from "../stores/RecordsStore";

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
    const records = [];

    this.state.records.forEach( ( v ) => {
      records.push( <ListItem key={v.id} record={v} /> );
    } );

    return (
      <main id="root-view">
        <header>
          <div id="category">Produkty</div>
          <div id="sort">
            <i className="material-icons">arrow_upward</i>
            <span>DATA ZAKUPU</span>
          </div>
        </header>
        {records}
      </main>
    );
  }
}
