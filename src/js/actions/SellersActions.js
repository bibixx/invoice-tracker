export function addSeller( data ) {
  return function( dispatch ) {
    fetch( "http://localhost:80/server/addSeller.php", { method: "POST", body: data } )
      .then( response => response.json() )
      .then( json => dispatch( { type: "ADD_SELLER", payload: json } ) );
  };
}

export function editSeller( data ) {
  return function( dispatch ) {
    fetch( "http://localhost:80/server/editSeller.php", { method: "POST", body: data } )
      .then( response => response.json() )
      .then( json => dispatch( { type: "EDIT_SELLER", payload: json } ) );
  };
}

export function requestSellers() {
  return function( dispatch ) {
    const json = [{
      "id": "0",
      "name": "Dupa sp. z o.o.",
      "nip": "0000000000",
      "city": "Dupowo",
      "street": "ul. Dupna 2",
      "zip": "69-666",
      "isSeller": true,
      "isPlace": true,
    }];
    dispatch( { type: "FETCHED_SELLERS", payload: json } );
    // return fetch( "http://localhost:80/server/getSellers.php" )
    //   .then( response => response.json() )
    //   .then( json => dispatch( { type: "FETCHED_SELLERS", payload: json } ) );
  };
}
