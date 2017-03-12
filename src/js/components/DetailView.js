import React from "react";

import RecordsStore from "../stores/RecordsStore";
import * as RecordsActions from "../actions/RecordsActions";

import Header from "./DetailView/Header";
import Product from "./DetailView/Product";
import AddProduct from "./DetailView/AddProduct";
import AddSeller from "./DetailView/AddSeller";

export default class DetailView extends React.Component {
  constructor( props ) {
    super( props );
    this.getRecord = this.getRecord.bind( this );

    this.state = {
      record: RecordsStore.getById( this.props.params.id ),
    };
  }

  componentWillMount() {
    RecordsStore.on( "change", this.getRecord );
    RecordsActions.syncRecords();
  }

  componentWillUnmount() {
    RecordsStore.removeListener( "change", this.getRecord );
  }

  getRecord() {
    if ( this.props ) {
      this.setState( {
        record: RecordsStore.getById( this.props.params.id ),
      } );
    }
  }

  render() {
    let content = null;
    let title = "Gwarancje";
    let btn = false;
    switch ( this.props.route.type ) {
      case "product":
        content = ( <Product record={this.state.record} /> );
        if ( this.state.record !== null ) {
          title = this.state.record.name;
        } else {
          title = "";
        }
        btn = {
          text: "edit",
          // link: "/add-product",
        };

        break;
      case "addProduct":
        content = ( <AddProduct /> );
        title = "Dodaj produkt";
        break;
      case "addSeller":
        content = ( <AddSeller /> );
        title = "Dodaj sprzedawcę";
        break;
      // no default
    }

    if ( this.state.record === null && this.props.route.type === "product" ) {
      return null;
    }

    return (
      <div className="detail-view">
        <Header title={title} button={btn} />
        { content }
      </div>
    );
  }
}

DetailView.propTypes = {
  params: React.PropTypes.object,
  route: React.PropTypes.object,
};
