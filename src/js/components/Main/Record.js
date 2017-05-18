import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import { formatDate } from "../../utils/DateUtils";
import { yearDeclination } from "../../utils/LangUtils";

export default class Record extends React.Component {
  render() {
    const date = this.props.warrantyDate;
    const endingDate = new Date( date.getFullYear() + this.props.warrantyLength, date.getMonth(), date.getDate() );
    const difference = ( ( endingDate - new Date() ) / 1000 / 60 / 60 / 24 / 365 ).toFixed( 1 );
    const warrantyState = ( difference <= 0 ) ? "over" : ( difference > 0.5 ) ? "valid" : "warning";

    return (
      <div className="records-list__record-container">
        <Link to={ `/product/${this.props.id}` } className="records-list__record">
          <p className="records-list__record__detail records-list__record__detail--name">{ this.props.name }</p>
          <p className="records-list__record__detail records-list__record__detail--place">{ this.props.place.name }</p>
          <p className={ `records-list__record__detail records-list__record__detail--warranty records-list__record__detail--warranty--${warrantyState}` }>
            <span className="records-list__record__detail--warranty__date">
              <i className="material-icons">event</i>
              <span>{ formatDate( date ) }</span>
            </span>
            <span className="records-list__record__detail--warranty__left">
              <i className="material-icons">hourglass_empty</i>
              <span>{ `${yearDeclination( this.props.warrantyLength )} (${yearDeclination( Math.abs( difference ) )})` }</span>
            </span>
          </p>
        </Link>
      </div>
    );
  }
}

Record.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.object.isRequired,
  warrantyDate: PropTypes.object.isRequired,
  warrantyLength: PropTypes.number.isRequired,
};
