import React from "react";

import RecordsStore from "../stores/RecordsStore";

import Header from "./DetailView/Header";
import Product from "./DetailView/Product";
import AddProduct from "./DetailView/AddProduct";

export default class DetailView extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      record: RecordsStore.getById( this.props.params.id ),
    };
  }

  componentWillMount() {
    RecordsStore.on( "change", this.getRecord );
  }

  componentWillUnmount() {
    RecordsStore.removeListener( "change", this.getRecord );
  }

  getRecord() {
    this.setState( {
      record: RecordsStore.getById( this.props.params.id ),
    } );
  }

  render() {
    let content = null;
    let title = "Gwarancje";
    let btn = false;
    switch ( this.props.route.type ) {
      case "product":
        content = ( <Product record={this.state.record} /> );
        title = this.state.record.name;
        btn = "edit";
        break;
      case "addProduct":
        content = ( <AddProduct /> );
        title = "Dodaj produkt";
        break;
      // no default
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
