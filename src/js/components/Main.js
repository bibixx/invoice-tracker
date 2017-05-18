import React from "react";
import PropTypes from "prop-types";

import Record from "./Main/Record";
import { getById } from "../utils/RecordUtils";

export default class Main extends React.Component {
  render() {
    const sellers = this.props.sellers;
    const records = this.props.records
      .sort( ( a, b ) => {
        const aDate = a.warrantyDate;
        const bDate = b.warrantyDate;
        return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
      } )
      .map( record => <Record key={ record.id } id={ record.id } name={ record.name } place={ getById( record.place, sellers ) } warrantyDate={ record.warrantyDate } warrantyLength={ record.warrantyLength } /> );

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

Main.defaultProps = {
  records: [],
  sellers: [],
};
