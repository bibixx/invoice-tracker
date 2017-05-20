export function addRecord( data ) {
  return function( dispatch ) {
    fetch( "http://localhost/server/addRecord.php", { method: "POST", body: data } )
      .then( response => response.json() )
      .then( json => dispatch( { type: "ADD_RECORD", payload: json } ) );
  };
}

export function requestRecords() {
  return function( dispatch ) {
    return fetch( "http://localhost/server/getRecords.php" )
      .then( response => response.json() )
      .then( json => dispatch( { type: "FETCHED_RECORDS", payload: json } ) );
  };
}
