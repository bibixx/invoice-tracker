import React from "react";
import PropTypes from "prop-types";

import Record from "./Main/Record";

export default class Main extends React.Component {
  render() {
    const sellers = this.props.sellers;
    const records = this.props.records.map( record => <Record key={ record.id } id={ record.id } name={ record.name } place={ sellers[ record.place ] } warrantyDate={ record.warrantyDate } warrantyLength={ record.warrantyLength } /> );

    return (
      <main className="records-list">
        { records }
      </main>
    );
  }
}


Main.propTypes = {
  records: PropTypes.array,
  sellers: PropTypes.array,
};
