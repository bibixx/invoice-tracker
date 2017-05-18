export default class Validator {
  constructor() {
    this.inputGroups = [];

    this.submit = this.submit.bind( this );
  }

  add( input, group, testFunction = () => true ) {
    this.inputGroups.push( { input, group, testFunction } );
  }

  validate( inputGroup, submitting ) {
    if ( inputGroup.input instanceof HTMLInputElement || inputGroup.input instanceof HTMLTextAreaElement ) {
      return this.validateInput( inputGroup, submitting );
    }

    return true;
  }

  validateInput( inputGroup, submitting ) {
    if ( submitting ) {
      inputGroup.group.classList.add( "material-input--touched" );
    }

    const input = inputGroup.input;
    if ( input.required && input.value === "" ) {
      inputGroup.group.classList.add( "material-input--invalid" );
      return false;
    }

    if ( input.pattern && !( new RegExp( input.pattern ) ).test( input.value ) ) {
      inputGroup.group.classList.add( "material-input--invalid" );
      return false;
    }

    if ( !inputGroup.testFunction.call( null, input.value ) ) {
      inputGroup.group.classList.add( "material-input--invalid" );
      return false;
    }

    inputGroup.group.classList.remove( "material-input--invalid" );
    return true;
  }

  checkValidity( submitting = false ) {
    let valid = true;
    this.inputGroups.forEach( ( inputGroup ) => {
      if ( !this.validate( inputGroup, submitting ) ) {
        valid = false;
      }
    } );

    return valid;
  }

  submit( e, callback ) {
    if ( this.checkValidity( true ) ) {
      callback();
    } else {
      console.error( "Not valid!" );
    }
  }
}
