import React from "react";
import PropTypes from "prop-types";

export default class Select extends React.Component {
  render() {
    const label = ( this.props.children ) ? ( <label className="material-checkbox__label" htmlFor={ this.props.id }>{ this.props.children }{ this.props.required ? " *" : "" }</label> ) : null;

    return (
      <div className="material-checkbox">
        <input ref={ ( e ) => { this.input = e; } } id={ this.props.id } type="checkbox" className="material-checkbox__input" defaultChecked={ this.props.checked } disabled={ this.props.disabled } />
        { label }
        <label htmlFor={ this.props.id } className="material-checkbox__square material-icons">check_box_outline_blank</label>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  validator: {},
  id: null,
  children: "",
  required: false,
  checked: false,
  disabled: false,
};
