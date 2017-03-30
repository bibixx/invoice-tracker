import React from "react";

import { Link, browserHistory } from "react-router";

export default class Header extends React.Component {
  click() {
    browserHistory.goBack();
  }

  render() {
    const lBtn = () => {
      if ( !this.props.button.text ) {
        return null;
      }

      if ( this.props.button.link ) {
        return (
          <Link id={this.props.button.text} to={this.props.button.link}>
            <i className="material-icons">{this.props.button.text}</i>
          </Link>
        );
      }

      return (
        <button id={this.props.button.text}>
          <i className="material-icons">{this.props.button.text}</i>
        </button>
      );
    };

    return (
      <header className="app-bar">
        <button id="menu" onClick={this.click}>
          <i className="material-icons">arrow_back</i>
        </button>
        <span className="title">{this.props.title}</span>
        { lBtn() }
      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string,
  button: React.PropTypes.oneOfType( [
    React.PropTypes.object,
    React.PropTypes.bool,
  ] ),
};
