import React from "react";
import PropTypes from "prop-types";

export default class Select extends React.Component {
  render() {
    const label = ( this.props.children ) ? ( <label className="material-input__label" htmlFor={ this.props.id }>{ this.props.children }{ this.props.required ? " *" : "" }</label> ) : null;
    const options = this.props.options.map( ( v, i ) => {
      let text = "";
      if ( v.text ) {
        text = v.text;
      } else if ( v ) {
        text = v;
      }

      return ( <option key={ `option-${this.props.id}-${i}` } id={ v.id }>{ text }</option> );
    } );
    return (
      <div className="material-input">
        { label }
        <select ref={ ( e ) => { this.input = e; } } className="material-input__select" id={ this.props.id }>
          { options }
        </select>
        <div className="material-input__border" />
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
};

Select.defaultProps = {
  validator: {},
  id: null,
  children: "",
  required: false,
};
