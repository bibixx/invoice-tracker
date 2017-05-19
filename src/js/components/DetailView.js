import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";

export default class DetailView extends React.Component {
  render() {
    return (
      <div className="detail-view">
        <Header title={ this.props.title } isEditable={ this.props.isEditable } path={ this.props.children.props.location.pathname } />
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
  isEditable: PropTypes.bool,
};

DetailView.defaultProps = {
  children: {},
  title: "",
  isEditable: false,
};
