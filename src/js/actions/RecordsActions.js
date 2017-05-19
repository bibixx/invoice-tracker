export function addRecord( data ) {
  return {
    type: "ADD_RECORD",
    payload: data,
  };
}

export function requestRecords() {
  return function( dispatch ) {
    return fetch( "http://localhost/server/getRecords.php" )
      .then( response => response.json() )
      .then( json => dispatch( { type: "FETCHED_RECORDS", payload: json } ) );
  };
}
