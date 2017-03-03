import React from "react";

export default class HeaderRoot extends React.Component {
  render() {
    return (
      <header className="app-bar">
        <button id="menu">
          <i className="material-icons">menu</i>
        </button>
        <span className="title">Gwarancje</span>
        <button id="filter">
          <i className="material-icons">filter_list</i>
        </button>
      </header>
    );
  }
}
