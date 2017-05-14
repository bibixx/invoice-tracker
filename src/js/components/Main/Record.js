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
      <Link to={ `/product/${this.props.id}` } className="record">
        <p className="record__detail record__detail--name">{ this.props.name }</p>
        <p className="record__detail record__detail--place">{ this.props.place.name }</p>
        <p className={ `record__detail record__detail--warranty record__detail--warranty--${warrantyState}` }>
          <span className="record__detail--warranty__date">
            <i className="material-icons">event</i>
            <span>{ formatDate( date ) }</span>
          </span>
          <span className="record__detail--warranty__left">
            <i className="material-icons">hourglass_empty</i>
            <span>{ `${yearDeclination( this.props.warrantyLength )} (${yearDeclination( Math.abs( difference ) )})` }</span>
          </span>
        </p>
      </Link>
    );
  }
}

Record.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  place: PropTypes.object,
  warrantyDate: PropTypes.object,
  warrantyLength: PropTypes.number,
};
