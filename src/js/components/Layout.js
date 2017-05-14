import React from "react";
import PropTypes from "prop-types";

import { getById } from "../utils/RecordUtils";

import Header from "./Header";
import Main from "./Main";
import DetailView from "./DetailView";
import FloatingAB from "./FloatingAB";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sellers: [
        {
          id: "a",
          name: "57 Concepts Sp. z o.o. (Zegarownia.pl)",
          city: "New city",
          street: "New street",
          zip: "00-000",
          nip: "0000000000",
          isSeller: true,
          isPlace: true,
        },
      ],
      records: [
        {
          id: "a",
          name: "Produkt #1",
          place: 0,
          seller: 0,
          warrantyDate: new Date( 2016, 10, 1 ),
          warrantyLength: 2,
        },
        {
          id: "b",
          name: "Produkt #2",
          place: 0,
          seller: 0,
          warrantyDate: new Date( 2017, 10, 1 ),
          warrantyLength: 2,
        },
      ],
    };
  }

  render() {
    const path = this.props.location.pathname;
    const segment = path.split( "/" )[ 1 ] || "root";

    let content = null;

    if ( segment === "product" ) {
      const record = getById( this.props.params.id, this.state.records );
      if ( record ) {
        content = ( <DetailView title={ record.name }>{ React.cloneElement( this.props.children, { key: segment, record, place: this.state.sellers[ record.place ], seller: this.state.sellers[ record.seller ] } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( segment === "seller" ) {
      const seller = getById( this.props.params.id, this.state.sellers );
      if ( seller ) {
        content = ( <DetailView title={ seller.name }>{ React.cloneElement( this.props.children, { key: segment, seller } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( segment === "add-product" ) {
      content = ( <DetailView title={ "Dodaj rekord" }>{ React.cloneElement( this.props.children, { key: segment, sellers: this.state.sellers } ) }</DetailView> );
    }

    return (
      <div>
        <Header appBar />
        <Main records={ this.state.records } sellers={ this.state.sellers } />
        <FloatingAB />
        { content }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
};
