import React from "react";

import { Link } from "react-router";

import { calculateWarrantyLeft, formatDate } from "../../utils/dateUtils";

import SellersStore from "../../stores/SellersStore";
import * as SellersActions from "../../actions/SellersActions";

export default class ListItem extends React.Component {
  constructor() {
    super();
    this.getSellers = this.getSellers.bind( this );
    this.state = {
      seller: {},
      place: {},
    };
  }

  componentWillMount() {
    SellersStore.on( "change", this.getSellers );
    SellersActions.syncSellers();
  }

  componentWillUnmount() {
    SellersStore.removeListener( "change", this.getSellers );
  }

  getSellers() {
    this.setState( {
      place: SellersStore.getById( this.props.record.place ),
    } );
  }

  render() {
    const record = this.props.record;
    const warrantyLeft = calculateWarrantyLeft( record.date, record.warrantyLength );

    return (
      <section className="product">
        <Link to={`/product/${record.id}`}>
          <main>
            <h2 className="product-name">{record.name}</h2>
            <span className="place">{this.state.place.name}</span>
            <div className={`date ${warrantyLeft.status}`}>
              <div>
                <i className="material-icons">event</i>
                <span>{formatDate( record.date )}</span>
              </div>
              <div>
                <i className="material-icons">hourglass_empty</i>
                <span>{warrantyLeft.text}</span>
              </div>
            </div>
          </main>
        </Link>
      </section>
    );
  }
}

ListItem.propTypes = {
  record: React.PropTypes.object.isRequired,
};
