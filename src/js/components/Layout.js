import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Root from "./Root";
import HeaderRoot from "./HeaderRoot";
import FloatingAB from "./FloatingAB";

export default class App extends React.Component {
  constructor() {
    super();
    this.pathStack = [];
    this.isBack = false;
  }

  render() {
    if ( this.props.location.action !== "REPLACE" ) {
      this.pathStack.unshift( this.props.location.pathname );

      this.isBack = ( this.pathStack[0] === this.pathStack[2] );

      if ( this.props.location.pathname === "/" ) {
        this.pathStack = ["/"];
      }

      if ( this.isBack ) {
        this.pathStack.shift();
        this.pathStack.shift();
      }
    }

    if ( this.forceBack ) {
      this.forceBack = false;
      this.isBack = true;
    }

    if ( this.pathStack.length === 1 && this.pathStack[0] !== "/" ) {
      this.forceBack = true;
    }

    const path = this.props.location.pathname;
    const segment = path.split( "/" )[1] || "root";
    let transName = "detail-view";

    if ( this.isBack ) {
      transName = "detail-view-back";
    }

    return (
      <div>
        <HeaderRoot />
        <Root />
        <ReactCSSTransitionGroup component="div" className="detail-views" transitionName={transName} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {React.cloneElement( this.props.children, { key: segment } )}
        </ReactCSSTransitionGroup>
        <FloatingAB />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object,
};
