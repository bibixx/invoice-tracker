import React from "react";

export default class OptionButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick() {
    this.props.changeInput( this.props.value );
  }

  render() {
    const selectedClass = ( this.props.isSelected ) ? " selected" : "";
    const className = `option${selectedClass}`;
    return (
      <button type="button" tabIndex="-1" className={className} id={this.props.value.id} onClick={this.handleClick} onKeyDown={this.props.onKeyDown} onBlur={this.props.onBlur}>{this.props.value.text}</button>
    );
  }
}

OptionButton.propTypes = {
  changeInput: React.PropTypes.func,
  isSelected: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  value: React.PropTypes.object,
};
