export function addSeller( data ) {
  return {
    type: "ADD_SELLER",
    payload: data,
  };
}

export function requestSellers() {
  return function( dispatch ) {
    return fetch( "http://localhost/server/getSellers.php" )
      .then( response => response.json() )
      .then( json => dispatch( { type: "FETCHED_SELLERS", payload: json } ) );
  };
}
