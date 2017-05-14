import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";

export default class Header extends React.Component {
  render() {
    let leftButton = null;
    let rightButton = null;

    if ( this.props.appBar ) {
      leftButton = (
        <button className="header__button">
          <i className="material-icons">menu</i>
        </button>
      );
      rightButton = (
        <button className="header__button">
          <i className="material-icons">filter_list</i>
        </button>
      );
    } else {
      leftButton = (
        <button className="header__button" onClick={ browserHistory.goBack }>
          <i className="material-icons">arrow_back</i>
        </button>
      );
      rightButton = (
        <button className="header__button">
          <i className="material-icons">edit</i>
        </button>
      );
    }

    return (
      <header className="header">
        { leftButton }
        <span className="header__title">{ this.props.title }</span>
        { rightButton }
      </header>
    );
  }
}

Header.propTypes = {
  appBar: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  title: "Gwarancje",
};
