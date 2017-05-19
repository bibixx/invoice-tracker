import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getById } from "../utils/RecordUtils";
import { requestRecords } from "../actions/RecordsActions";
import { requestSellers } from "../actions/SellersActions";

import Header from "./Header";
import Main from "./Main";
import DetailView from "./DetailView";
import FloatingAB from "./FloatingAB";

@connect( ( store ) => {
  return {
    records: store.records.data,
    sellers: store.sellers.data,
    recordsFetched: store.records.fetched,
    sellersFetched: store.sellers.fetched,
  };
} )

export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch( requestRecords() );
    this.props.dispatch( requestSellers() );
  }

  render() {
    const path = this.props.location.pathname;
    const segment = path.split( "/" )[ 1 ] || "root";

    let content = null;

    const type = this.props.router.routes[ this.props.router.routes.length - 1 ].type;
    let fetched = this.props.recordsFetched && this.props.sellersFetched;

    if ( type === "product" ) {
      const record = getById( this.props.params.id, this.props.records );
      if ( record ) {
        content = ( <DetailView title={ record.name } isEditable>{ React.cloneElement( this.props.children, { key: segment, record, place: getById( record.place, this.props.sellers ), seller: getById( record.seller, this.props.sellers ) } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( type === "seller" ) {
      const seller = getById( this.props.params.id, this.props.sellers );
      if ( seller ) {
        fetched = this.props.sellersFetched;
        content = ( <DetailView title={ seller.name } isEditable>{ React.cloneElement( this.props.children, { key: segment, seller } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( type === "AddProduct" ) {
      content = ( <DetailView title={ "Dodaj rekord" }>{ React.cloneElement( this.props.children, { key: segment, sellers: this.props.sellers } ) }</DetailView> );
    } else if ( type === "EditProduct" ) {
      const record = getById( this.props.params.id, this.props.records );
      if ( record ) {
        content = ( <DetailView title={ `Edytujesz ${record.name}` }>{ React.cloneElement( this.props.children, { key: segment, record, sellers: this.props.sellers, edit: true } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    } else if ( type === "AddSeller" ) {
      fetched = true;
      content = ( <DetailView title={ "Dodaj sprzedawcę" }>{ React.cloneElement( this.props.children, { key: segment } ) }</DetailView> );
    } else if ( type === "EditSeller" ) {
      fetched = this.props.sellersFetched;
      const seller = getById( this.props.params.id, this.props.sellers );
      if ( seller ) {
        content = ( <DetailView title={ `Edytujesz ${seller.name}` }>{ React.cloneElement( this.props.children, { key: segment, seller } ) }</DetailView> );
      } else {
        console.error( "Invalid id!" );
      }
    }

    return (
      <div>
        <Header appBar />
        <Main records={ this.props.records } sellers={ this.props.sellers } fetched={ fetched } />
        <FloatingAB />
        { fetched ? content : null }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  recordsFetched: PropTypes.bool,
  sellersFetched: PropTypes.bool,
  records: PropTypes.array,
  sellers: PropTypes.array,
  router: PropTypes.object,
  dispatch: PropTypes.func,
};

App.defaultProps = {
  children: "",
  records: [],
  sellers: [],
  router: {},
  recordsFetched: false,
  sellersFetched: false,
  dispatch: () => {},
};
