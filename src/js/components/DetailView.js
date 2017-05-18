import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";

export default class DetailView extends React.Component {
  render() {
    return (
      <div className="detail-view">
        <Header title={ this.props.title } />
        <div className="detail-view__container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

DetailView.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string,
};

DetailView.defaultProps = {
  children: {},
  title: "",
};
