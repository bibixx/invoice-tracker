import React from "react";
import PropTypes from "prop-types";

export default class Input extends React.Component {
  constructor( props ) {
    super( props );
    this.Validator = props.validator;
    this.state = {
      filesNo: 0,
    };
  }

  render() {
    const props = {};

    for ( const prop in this.props ) {
      if ( this.props.hasOwnProperty( prop ) ) {
        if ( prop !== "children" && prop !== "validator" && prop !== "testFunction" ) {
          props[ prop ] = this.props[ prop ];
        }
      }
    }

    if ( this.props.type !== "file" ) {
      let input = (
        <input
          onBlur={ () => { this.group.classList.add( "material-input--touched" ); this.Validator.checkValidity(); } }
          className="material-input__input"
          { ...props }
          ref={ ( e ) => { this.input = e; } }
        /> );

      if ( this.props.type === "textarea" ) {
        input = (
          <textarea
            onBlur={ () => { this.group.classList.add( "material-input--touched" ); this.Validator.checkValidity(); } }
            className="material-input__input"
            { ...props }
            ref={ ( e ) => { this.input = e; } }
          /> );
      }

      const label = ( this.props.children ) ? ( <label className="material-input__label" htmlFor={ this.props.id }>{ this.props.children }{ this.props.required ? " *" : "" }</label> ) : null;

      return (
        <div className="material-input" ref={ ( e ) => { this.Validator.add( this.input, e, this.props.testFunction ); this.group = e; } }>
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
        { ...props }
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
  validator: PropTypes.object,
  testFunction: PropTypes.func,
};

Input.defaultProps = {
  id: null,
  children: "",
  type: "text",
  required: false,
  validator: {},
  testFunction: () => true,
};
