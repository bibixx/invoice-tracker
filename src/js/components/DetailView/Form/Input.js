import React from "react";
import PropTypes from "prop-types";

import Validator from "../../../Validator";

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      filesNo: 0,
    };
  }

  render() {
    if ( this.props.type !== "file" ) {
      let input = (
        <input
          onBlur={ () => { this.group.classList.add( "material-input--touched" ); Validator.checkValidity(); } }
          className="material-input__input"
          { ...this.props }
          children={ null } // eslint-disable-line react/no-children-prop
          ref={ ( e ) => { this.input = e; } }
        /> );

      if ( this.props.type === "textarea" ) {
        input = (
          <textarea
            onBlur={ () => { this.group.classList.add( "material-input--touched" ); Validator.checkValidity(); } }
            className="material-input__input"
            { ...this.props }
            children={ null } // eslint-disable-line react/no-children-prop
            ref={ ( e ) => { this.input = e; } }
          /> );
      }

      const label = ( this.props.children ) ? ( <label htmlFor={ this.props.id }><small className="material-input__label">{ this.props.children }{ this.props.required ? " *" : "" }</small></label> ) : null;

      return (
        <div className="material-input" ref={ ( e ) => { Validator.add( this.input, e ); this.group = e; } }>
          { label }
          { input }
          <div className="material-input__border" />
        </div>
      );
    }

    const input = (
      <input
        onChange={ ( e ) => { this.setState( { filesNo: e.target.files.length } ); } }
        className="material-input__input"
        { ...this.props }
        children={ null } // eslint-disable-line react/no-children-prop
        ref={ ( e ) => { this.input = e; } }
      /> );

    let buttonText = `Wybrano ${this.state.filesNo} `;

    if ( this.state.filesNo === 0 ) {
      buttonText = "Wybierz pliki...";
    } else if ( this.state.filesNo === 1 ) {
      buttonText += "plik";
    } else if ( this.state.filesNo < 5 ) {
      buttonText += "pliki";
    } else {
      buttonText += "plików";
    }

    return (
      <div className="material-input">
        { input }
        <label htmlFor={ this.props.id } className="material-button material-button--raised">
          { ( this.state.filesNo === 0 ) ? ( <i className="material-icons">file_upload</i> ) : null }
          { buttonText }
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  type: "text",
};
