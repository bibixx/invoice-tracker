export default class Validator {
  static validate( obj ) {
    for ( const key in obj ) {
      if ( obj.hasOwnProperty( key ) ) {
        const input = Validator.getInput( obj[key] );

        input.invalidate();
      }
    }

    let areAllValid = true;

    for ( const key in obj ) {
      if ( obj.hasOwnProperty( key ) ) {
        const input = Validator.getInput( obj[key] );
        let locallyValid = true;
        input.invalidate();
        if ( input.required && input.value === "" ) {
          locallyValid = false;
          if ( areAllValid === true ) {
            areAllValid = input.this;
          }
        }

        if ( input.pattern ) {
          const patt = new RegExp( input.pattern );
          if ( input.value !== "" && !patt.test( input.value ) ) {
            locallyValid = false;
            if ( areAllValid === true ) {
              areAllValid = input.this;
            }
          }
        }

        if ( input.isNIP ) {
          if ( !Validator.isNIP( input.value ) ) {
            locallyValid = false;
            if ( areAllValid === true ) {
              areAllValid = input.this;
            }
          }
        }

        if ( locallyValid === true || !input.required ) {
          input.validate();
        }
      }
    }

    return areAllValid;
  }

  static getInput( input ) {
    const name = input.constructor.name;

    if ( name === "Select" ) {
      return {
        required: input.props.required || false,
        value: input.value(),
        pattern: false,
        isNIP: input.props.isNIP || false,
        validate: () => { input.isValid( true ); },
        invalidate: () => { input.isValid( false ); },
        this: input.select,
      };
    }

    return {
      required: input.required || false,
      value: input.value,
      pattern: input.getAttribute( "pattern" ) || false,
      isNIP: input.getAttribute( "data-isNIP" ) || false,
      validate: () => { input.classList.remove( "invalid" ); },
      invalidate: () => { input.classList.add( "invalid" ); },
      this: input,
    };
  }

  static isNIP( nipNo ) {
    const nip = nipNo.split( "" );
    const wages = [6, 5, 7, 2, 3, 4, 5, 6, 7, 0];
    let sum = 0;
    nip.forEach( ( v, i ) => {
      sum += v * wages[i];
    } );

    return String( sum % 11 ) === nip[nip.length - 1];
  }
}
