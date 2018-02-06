export function addRecord( data ) {
  return function( dispatch ) {
    fetch( "http://localhost:80/server/addRecord.php", { method: "POST", body: data } )
      .then( response => response.json() )
      .then( json => dispatch( { type: "ADD_RECORD", payload: json } ) );
  };
}

export function editRecord( data ) {
  return function( dispatch ) {
    fetch( "http://localhost:80/server/editRecord.php", { method: "POST", body: data } )
      .then( response => response.json() )
      .then( json => dispatch( { type: "EDIT_RECORD", payload: json } ) );
  };
}

export function requestRecords() {
  return function( dispatch ) {
    const json = [{
      id: "0",
      name: "Dupa",
      place: "0",
      seller: "0",
      warrantyDate: "2017-01-01",
      warrantyLength: 2,
      notes: "",
      files: ["https://picsum.photos/", "200/200/"],
    }];
    dispatch( { type: "FETCHED_RECORDS", payload: json } );

    // return fetch( "http://localhost:80/server/getRecords.php" )
    //   .then( response => response.json() )
      // .then( json => dispatch( { type: "FETCHED_RECORDS", payload: json } ) );
  };
}
