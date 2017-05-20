import React from "react";
import PropTypes from "prop-types";

import Seller from "./Main/Seller";

export default class Main extends React.Component {
  render() {
    if ( this.props.fetched ) {
      const sellers = this.props.sellers.map( seller => <Seller key={ seller.id } id={ seller.id } name={ seller.name } zip={ seller.zip } city={ seller.city } street={ seller.street } nip={ seller.nip } /> );

      return (
        <main className="records-list">
          { sellers }
        </main>
      );
    }

    return (
      <main className="records-list" />
    );
  }
}


Main.propTypes = {
  sellers: PropTypes.array,
  fetched: PropTypes.bool,
};

Main.defaultProps = {
  sellers: [],
  fetched: false,
};
