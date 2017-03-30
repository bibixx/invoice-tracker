import React from "react";

import { Link } from "react-router";

import OptionButton from "./Select/OptionButton";

export default class Select extends React.Component {
  constructor() {
    super();
    this.handleOptionKeydown = this.handleOptionKeydown.bind( this );
    this.handleInputKeydown = this.handleInputKeydown.bind( this );
    this.handleInputFocus = this.handleInputFocus.bind( this );
    this.changeInputValue = this.changeInputValue.bind( this );
    this.handleSearchText = this.handleSearchText.bind( this );
    this.handleBlur = this.handleBlur.bind( this );
    this.defaultSearchFunction = ( targetValue, searchValue ) => {
      return ( searchValue === "" ) || ( targetValue.text.toLowerCase().indexOf( searchValue.toLowerCase() ) >= 0 );
    };
    this.state = {
      focus: false,
      selectedValue: {
        text: "",
        id: "",
      },
      searchText: "",
      isValid: true,
      isTouched: false,
    };
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( {
      selectedValue: nextProps.defaultValue,
    } );
    console.log( nextProps.defaultValue, this.props.options[0] );
  }

  getValue() {
    return this.state.selectedValue;
  }

  handleSearchText( e ) {
    this.setState( {
      searchText: e.target.value,
    } );
  }

  handleInputFocus() {
    this.setState( {
      focus: true,
      searchText: "",
    } );

    if ( this.searchInput ) {
      this.searchInput.value = "";
    }
  }

  handleOptionKeydown( e ) {
    // console.log( e.key );
    const currentEl = e.target;
    const prevEl = currentEl.previousElementSibling;
    const nextEl = currentEl.nextElementSibling;
    if ( e.key === "ArrowDown" ) {
      if ( nextEl !== null ) {
        nextEl.focus();
      }
    } else if ( e.key === "ArrowUp" ) {
      if ( prevEl !== null ) {
        prevEl.focus();
      }
    } else if ( e.key === "Escape" ) {
      this.blur();
    }
  }

  handleInputKeydown( e ) {
    if ( e.key === "ArrowDown" ) {
      this.selectGroup.querySelector( ".option" ).focus();
    } else if ( e.key === "Escape" ) {
      this.blur();
    }
  }

  handleBlur( e ) {
    const relTarget = e.relatedTarget;
    if ( ( relTarget === null ) || !(
        ( relTarget.className === "option" &&
        relTarget.parentNode.parentNode === this.selectGroup ) ||
        ( relTarget.className === "additional-link" &&
        relTarget.parentNode.parentNode === this.selectGroup ) ||
        ( relTarget.className === "search" &&
        relTarget.parentNode.parentNode.parentNode === this.selectGroup )
      )
    ) {
      this.blur();
    }
  }

  changeInputValue( value ) {
    this.setState( {
      selectedValue: value,
    } );

    this.blur();
    if ( this.props.onChange ) {
      this.props.onChange( { target: this } );
    }
  }

  blur() {
    this.setState( {
      focus: false,
    } );
  }

  isValid( valid ) {
    this.setState( {
      isValid: valid,
    } );
  }

  isTouched( touched ) {
    this.setState( {
      isTouched: touched,
    } );
  }

  render() {
    let optionsList = this.props.options.filter( ( v ) => {
      if ( this.props.searchFunction ) {
        return this.props.searchFunction( v, this.state.searchText );
      }

      return this.defaultSearchFunction( v, this.state.searchText );
    } );

    optionsList = optionsList.map( ( v, i ) => {
      let isSelected = false;

      if ( this.state.selectedValue.text === v.text && this.state.selectedValue.id === v.id ) {
        isSelected = true;
      }

      return <OptionButton value={v} key={v.id || i} isSelected={isSelected} changeInput={this.changeInputValue} onKeyDown={this.handleOptionKeydown} onBlur={this.handleBlur} />;
    } );

    const searchInput = (
      <div className="search-input">
        <input onBlur={this.handleBlur} onKeyDown={this.handleInputKeydown} onChange={this.handleSearchText} ref={( input ) => { this.searchInput = input; }} className="search" type="text" placeholder="Wyszukaj..." />
      </div>
    );

    let additionalLink = null;

    if ( this.props.link ) {
      additionalLink = (
        <Link to={this.props.link.url} onKeyDown={this.handleOptionKeydown} onBlur={this.handleBlur} tabIndex="-1" className="option">{this.props.link.text}</Link>
      );
    }

    const classNamesRoot = ["select-group"];

    if ( !this.state.isValid ) {
      classNamesRoot.push( "invalid" );
    }

    if ( this.state.isTouched ) {
      classNamesRoot.push( "touched" );
    }

    return (
      <div className={classNamesRoot.join( " " )} ref={( div ) => { this.selectGroup = div; }}>
        <input type="text" className="select-input" value={this.state.selectedValue.text} id={this.props.id} data-option-id={this.state.selectedValue.id} onFocus={this.handleInputFocus} onBlur={this.handleBlur} onKeyDown={this.handleInputKeydown} autoComplete="off" ref={( input ) => { this.input = input; }} />
        <div className={`options-container${( this.state.focus ) ? " focus" : ""}`}>
          {this.props.search ? searchInput : null}
          {additionalLink}
          {optionsList}
        </div>
        <label htmlFor={this.props.id}>
          <div className="material-icons">arrow_drop_down</div>
        </label>
        <div className="border" />
      </div>
    );
  }
}


Select.propTypes = {
  options: React.PropTypes.array.isRequired,
  id: React.PropTypes.string.isRequired,
  searchFunction: React.PropTypes.func,
  defaultValue: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  onChange: React.PropTypes.func,
  search: React.PropTypes.bool,
  link: React.PropTypes.object,
};
