export const yearDeclination = ( year ) => {
  let y = parseInt( year, 10 );

  if ( typeof year !== "string" && ( year !== Math.floor( year ) ) ) {
    return "roku";
  }

  y = String( year );

  if ( y === "1" ) {
    return "rok";
  }

  const lastChar = parseInt( y[y.length - 1], 10 );

  if ( ( lastChar > 1 && lastChar < 5 ) && ( parseInt( y, 10 ) < 10 || parseInt( y, 10 ) > 20 ) ) {
    return "lata";
  }

  return "lat";
};

export function calculateWarrantyLeft( date, warrantyLength, left ) {
  const warrantyStart = new Date( date );
  const now = new Date();
  now.setHours( 0 );
  now.setMinutes( 0 );
  now.setSeconds( 0 );

  const timeDiff = ( warrantyStart.getTime() + ( ( 1000 * 3600 * 24 * 365 ) * warrantyLength ) ) - now.getTime();
  const dd = Math.ceil( timeDiff / ( 1000 * 3600 * 24 ) );

  const dayDeclination = ( day ) => {
    if ( day === 1 ) {
      return "dzień";
    }

    return "dni";
  };

  const timeLeftDeclination = ( time ) => {
    if ( time <= 365 ) {
      return `${time} ${dayDeclination( time )}`;
    }

    const yTime = Math.round( ( time / 365 ) * 10 ) / 10;
    return `${yTime} ${yearDeclination( yTime )}`;
  };

  const leftDeclination = ( day ) => {
    const d = parseInt( day, 10 );

    if ( left && d >= 0 ) {
      if ( d === 1 ) {
        return "został ";
      }

      return "zostało ";
    }

    return "";
  };

  let status = "valid";

  if ( dd < 30 ) {
    status = "warning";
  }

  if ( dd < 0 ) {
    status = "";
  }

  return {
    text: `${warrantyLength} ${yearDeclination( warrantyLength )} (${leftDeclination( dd )}${timeLeftDeclination( dd )}${( status === "" ) ? " temu" : ""})`,
    status,
  };
}

export function formatDate( d ) {
  const to2Dig = ( a ) => {
    return ( `00${a}` ).slice( -2 );
  };

  const date = new Date( d );
  return `${to2Dig( date.getDate() )}.${to2Dig( date.getMonth() + 1 )}.${date.getFullYear()}`;
}
