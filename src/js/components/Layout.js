import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getById } from "../utils/RecordUtils";

import Header from "./Header";
import Main from "./Main";
import DetailView from "./DetailView";
import FloatingAB from "./FloatingAB";

@connect( ( store ) => {
  return {
    records: store.records,
    sellers: store.sellers,
  };
} )

export default class App extends React.Component {
  render() {
    const path = this.props.location.pathname;
    const segment = path.split( "/" )[ 1 ] || "root";

    let content = null;

    const type = this.props.router.routes[ this.props.router.routes.length - 1 ].type;

    if ( type === "product" ) {
      const record = getById( this.props.params.id, this.props.records );
      if ( record ) {
        content = ( <DetailView title={ record.name }>{ React.cloneElement( this.props.children, { key: segment, record, place: getById( record.place, this.props.sellers ), seller: getById( record.seller, this.props.sellers ) } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( type === "seller" ) {
      const seller = getById( this.props.params.id, this.props.sellers );
      if ( seller ) {
        content = ( <DetailView title={ seller.name }>{ React.cloneElement( this.props.children, { key: segment, seller } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( type === "AddProduct" ) {
      content = ( <DetailView title={ "Dodaj rekord" }>{ React.cloneElement( this.props.children, { key: segment, sellers: this.props.sellers } ) }</DetailView> );
    } else if ( type === "EditProduct" ) {
      const record = getById( this.props.params.id, this.props.records );
      if ( record ) {
        content = ( <DetailView title={ "Dodaj rekord" }>{ React.cloneElement( this.props.children, { key: segment, record, sellers: this.props.sellers, edit: true } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( type === "AddSeller" ) {
      content = ( <DetailView title={ "Dodaj sprzedawcę" }>{ React.cloneElement( this.props.children, { key: segment } ) }</DetailView> );
    }

    return (
      <div>
        <Header appBar isEditable={ false } />
        <Main records={ this.props.records } sellers={ this.props.sellers } />
        <FloatingAB />
        { content }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  records: PropTypes.array,
  sellers: PropTypes.array,
  router: PropTypes.object,
};

App.defaultProps = {
  children: "",
  records: [],
  sellers: [],
  router: {},
};
