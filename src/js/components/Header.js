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

    if ( !this.props.appBar && !this.props.isEditable ) {
      rightButton = null;
    }

    return (
      <header className={ `header${this.props.appBar ? " header--app-bar" : ""}` }>
        { leftButton }
        <span className="header__title">{ this.props.title }</span>
        { rightButton }
      </header>
    );
  }
}

Header.propTypes = {
  appBar: PropTypes.bool,
  isEditable: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  appBar: false,
  isEditable: false,
  title: "Gwarancje",
};
