import React from "react";

import { Link } from "react-router";

export default class Select extends React.Component {
  constructor( props ) {
    super( props );
    this.handleMouseDown = this.handleMouseDown.bind( this );
    this.selectFocus = this.selectFocus.bind( this );
    this.handleBlur = this.handleBlur.bind( this );
    this.btnClick = this.btnClick.bind( this );
    this.search = this.search.bind( this );
    this.value = this.value.bind( this );
    this.state = {
      focused: false,
      checked: 0,
      options: this.props.options,
    };

    this.searchInput = {
      blur: () => {},
    };

    this.searchFunction = ( targetValue, searchValue ) => {
      return ( searchValue === "" ) || ( targetValue.text.toLowerCase().indexOf( searchValue.toLowerCase() ) >= 0 );
    };

    if ( this.props.searchFunction ) {
      this.searchFunction = this.props.searchFunction;
    }
  }

  oneOfParnetsHaveClass( target, className, i = 0 ) {
    i++; // eslint-disable-line no-param-reassign
    const html = document.documentElement;

    if ( target.className.indexOf( className ) >= 0 ) {
      return true;
    } else if ( ( target !== html ) && ( i < 1000 ) ) {
      return this.oneOfParnetsHaveClass( target.parentNode, className, i );
    }

    return false;
  }

  handleMouseDown( e ) {
    if ( e.code === "ArrowDown" ) {
      this.setState( Object.assign( this.state, {
        checked: Math.min( this.state.checked + 1, this.state.options.length - 1 ),
      } ) );
    } else if ( e.code === "ArrowUp" ) {
      this.setState( Object.assign( this.state, {
        checked: Math.max( this.state.checked - 1, 0 ),
      } ) );
    } else if ( e.code === "Escape" ) {
      this.handleBlur( e );
    } else if ( e.code === "Enter" || ( e.code === "Space" && e.target !== this.searchInput ) ) {
      this.select.value = this.state.options[this.state.checked].text;
      this.select.setAttribute( "option-id", this.state.options[this.state.checked].id );
      this.select.blur();
      this.searchInput.blur();
      this.setState( Object.assign( this.state, {
        focused: false,
      } ) );
    }
  }

  selectFocus() {
    this.setState( Object.assign( this.state, {
      checked: 0,
      focused: true,
      options: this.props.options,
    } ) );

    this.searchInput.value = "";

    document.addEventListener( "keydown", this.handleMouseDown );
  }

  handleBlur( e ) {
    if ( !( e.relatedTarget && this.oneOfParnetsHaveClass( e.relatedTarget, "options-container" ) ) ) {
      this.select.blur();
      document.removeEventListener( "keydown", this.handleMouseDown );
      this.setState( Object.assign( this.state, {
        focused: false,
      } ) );
    }
  }

  btnClick( e ) {
    this.select.value = e.target.innerHTML;
    this.select.setAttribute( "option-id", e.target.id );
    e.target.blur();
    this.searchInput.blur();
    this.setState( Object.assign( this.state, {
      focused: false,
    } ) );
  }

  value() {
    return this.select.value;
  }

  id() {
    return this.select.getAttribute( "option-id" );
  }

  search( e ) {
    const options = [];
    this.props.options.forEach( ( v ) => {
      if ( this.searchFunction( v, e.target.value ) ) {
        options.push( v );
      }
    } );

    this.setState( Object.assign( this.state, {
      options,
      checked: 0,
    } ) );
  }

  render() {
    const options = [];
    let serachInput = null;

    this.state.options.forEach( ( v, i ) => {
      const id = v.id || null;
      options.push( <button id={id} tabIndex="-1" ref={( input ) => { if ( this.state.focused && ( i === this.state.checked ) && ( document.activeElement !== this.searchInput ) ) { return ( input && input.focus() ); } return false; }} onBlur={this.handleBlur} onClick={this.btnClick} type="button" key={i} className={`option${( i === this.state.checked ) ? " checked" : ""}`}>{v.text}</button> );
    } );

    if ( this.props.link ) {
      options.unshift( <Link key="add" to={this.props.link.url}><button tabIndex="-1" onBlur={this.handleBlur} onClick={this.btnClick} type="button" className="option">{this.props.link.text}</button></Link> );
    }

    if ( this.props.search ) {
      serachInput = (
        <div className="search-input">
          <input onBlur={this.handleBlur} onChange={this.search} ref={( input ) => { this.searchInput = input; }} className="search" type="text" placeholder="Wyszukaj..." />
        </div>
      );
    }

    return (
      <div className="select-group">
        <input type="text" className="select-input" defaultValue={this.props.defaultValue} ref={( select ) => { this.select = select; }} onFocus={this.selectFocus} onBlur={this.handleBlur} id={this.props.id} />
        <div className={`options-container${( this.state.focused ) ? " focus" : ""}`}>
          {serachInput}
          {options}
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
  defaultValue: React.PropTypes.string,
  search: React.PropTypes.bool,
  link: React.PropTypes.object,
};
