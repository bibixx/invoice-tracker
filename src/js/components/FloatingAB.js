import React from "react";

import { Link } from "react-router";

export default class FloatingAB extends React.Component {
  constructor() {
    super();
    this.toggleClicked = this.toggleClicked.bind( this );
    this.state = {
      clicked: false,
    };
  }

  toggleClicked() {
    this.setState( {
      clicked: !this.state.clicked,
    } );
  }

  render() {
    return (
      <div onClick={this.toggleClicked} className={`fab-main${this.state.clicked ? " clicked" : ""}`}>
        <i className="material-icons">add</i>
        <i className="material-icons">close</i>
        <div className="submenu">
          <Link to="/add-seller" className="fab-mini"><span><i className="material-icons">person</i></span></Link>
          <Link to="/add-product" className="fab-mini"><span><i className="material-icons">receipt</i></span></Link>
        </div>
      </div>
    );
  }
}
