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
    return fetch( "http://localhost:80/server/getSellers.php" )
      .then( response => response.json() )
      .then( json => dispatch( { type: "FETCHED_SELLERS", payload: json } ) );
  };
}
