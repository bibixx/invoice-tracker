import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

export default class Record extends React.Component {
  render() {
    return (
      <div className="records-list__record-container">
        <Link to={ `/seller/${ this.props.id }` } className="records-list__record records-list__record--seller">
          <p className="records-list__record__detail records-list__record__detail--name">{ this.props.name }</p>
          <p className="records-list__record__detail records-list__record__detail--place">{ `${ this.props.zip } ${ this.props.city }, ${ this.props.street }, NIP: ${ this.props.nip }` }</p>
        </Link>
      </div>
    );
  }
}

Record.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  nip: PropTypes.string.isRequired,
};
