export const yearDeclination = ( year ) => {
  if ( year !== Math.floor( year ) ) {
    return `${year} roku`;
  } else if ( year === 1 ) {
    return `${year} rok`;
  } else if ( year > 0 && year < 5 ) {
    return `${year} lata`;
  }

  return `${year} lat`;
};
