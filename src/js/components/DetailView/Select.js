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
      checked: -1,
      options: this.props.options,
      isValid: true,
      isTouched: false,
      value: "",
    };

    this.searchInput = {
      blur: () => {},
    };

    this.rootOnChange = this.props.onChange || function() {};

    this.searchFunction = ( targetValue, searchValue ) => {
      return ( searchValue === "" ) || ( targetValue.text.toLowerCase().indexOf( searchValue.toLowerCase() ) >= 0 );
    };

    if ( this.props.searchFunction ) {
      this.searchFunction = this.props.searchFunction;
    }
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( Object.assign( this.state, {
      value: nextProps.defaultValue.text,
    } ) );

    this.select.setAttribute( "option-id", nextProps.defaultValue.id );
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

  getCheckedValue( target ) {
    let checkedMatches = 0;
    this.props.options.forEach( ( v, i ) => {
      if ( target.innerHTML || target.id ) {
        if ( ( v.text === target.innerHTML ) || ( v.id === target.id && v.id ) ) {
          checkedMatches = i;

          this.setState( Object.assign( this.state, {
            value: v.text,
          } ) );
        }
      }
    } );

    this.setState( Object.assign( this.state, {
      checked: checkedMatches,
    } ) );

    return checkedMatches;
  }

  getDefaultCheckedValue() {
    if ( this.state.checked >= 0 ) {
      return this.state.checked;
    }

    let checkedMatches = 0;
    this.props.options.forEach( ( v, i ) => {
      if ( this.props.defaultValue.text || this.props.defaultValue.id ) {
        if ( ( v.text === this.props.defaultValue.text ) || ( v.id === this.props.defaultValue.id && v.id ) ) {
          checkedMatches = i;

          this.setState( Object.assign( this.state, {
            value: v.text,
          } ) );
        }
      }
    } );

    this.setState( Object.assign( this.state, {
      checked: checkedMatches,
    } ) );

    return checkedMatches;
  }

  show() {
    this.setState( Object.assign( this.state, {
      checked: this.getDefaultCheckedValue(),
      focused: true,
      options: this.props.options,
    } ) );
  }

  hide() {
    this.setState( Object.assign( this.state, {
      focused: false,
    } ) );
  }

  isValid( valid ) {
    this.setState( Object.assign( this.state, {
      isValid: valid,
    } ) );
  }

  isTouched( touched ) {
    this.setState( Object.assign( this.state, {
      isTouched: touched,
    } ) );
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
      this.change( this.state.options[this.state.checked].text );
      this.select.setAttribute( "option-id", this.state.options[this.state.checked].id );
      this.select.blur();
      this.searchInput.blur();

      this.hide();
    }
  }

  selectFocus() {
    this.show();

    this.searchInput.value = "";

    document.addEventListener( "keydown", this.handleMouseDown );
  }

  handleBlur( e ) {
    if ( !( e.relatedTarget && this.oneOfParnetsHaveClass( e.relatedTarget, "options-container" ) ) ) {
      this.select.blur();
      document.removeEventListener( "keydown", this.handleMouseDown );
      this.hide();
    }
  }

  btnClick( e ) {
    this.change( e.target.innerHTML );
    this.select.setAttribute( "option-id", e.target.id );

    this.setState( Object.assign( this.state, {
      checked: this.getCheckedValue( e.target ),
    } ) );

    e.target.blur();
    this.searchInput.blur();
    this.hide();
  }

  value() {
    return this.state.value;
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

  change( val ) {
    if ( val !== null ) {
      this.setState( Object.assign( this.state, {
        value: val,
      } ) );
    }

    this.isTouched( true );
    this.rootOnChange( {
      target: this,
    } );
  }

  render() {
    const options = [];
    let serachInput = null;

    this.state.options.forEach( ( v, i ) => {
      const id = v.id || null;
      options.push(
        <button
          id={id}
          tabIndex="-1"
          ref={( input ) => { if ( this.state.focused && ( i === this.state.checked ) && ( document.activeElement !== this.searchInput ) ) { return ( input && input.focus() ); } return false; }}
          onBlur={this.handleBlur}
          onClick={this.btnClick}
          type="button"
          key={i}
          className={`option${( i === this.state.checked ) ? " checked" : ""}`}
        >{v.text}</button> );
    } );

    if ( this.props.link ) {
      options.unshift( <Link onBlur={this.handleBlur} key="add" to={this.props.link.url}><button tabIndex="-1" onBlur={this.handleBlur} onClick={this.btnClick} type="button" className="option">{this.props.link.text}</button></Link> );
    }

    if ( this.props.search ) {
      serachInput = (
        <div className="search-input">
          <input onBlur={this.handleBlur} onChange={this.search} ref={( input ) => { this.searchInput = input; }} className="search" type="text" placeholder="Wyszukaj..." />
        </div>
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
      <div className={classNamesRoot.join( " " )}>
        <input type="text" className="select-input" value={this.state.value} ref={( select ) => { this.select = select; }} onFocus={this.selectFocus} onBlur={this.handleBlur} onChange={() => { this.change( null ); }} id={this.props.id} />
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
  defaultValue: React.PropTypes.object,
  onChange: React.PropTypes.func,
  search: React.PropTypes.bool,
  link: React.PropTypes.object,
};
