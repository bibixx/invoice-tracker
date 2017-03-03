import React from "react";

import { Link } from "react-router";

import { calculateWarrantyLeft, formatDate } from "../../utils/dateUtils";

export default class ListItem extends React.Component {
  render() {
    const record = this.props.record;
    const warrantyLeft = calculateWarrantyLeft( record.date, record.warrantyLength );


    return (
      <section className="product">
        <Link to={`/product/${record.id}`}>
          <main>
            <h2 className="product-name">{record.name}</h2>
            <span className="place">{record.place}</span>
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
