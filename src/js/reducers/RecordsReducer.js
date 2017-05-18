export default function reducer( state = [], action ) {
  const newState = state.slice();

  switch ( action.type ) {
    case "ADD_RECORD":
      newState.push( action.payload );

      return newState;
    // no default
  }

  return [
    {
      id: "a",
      name: "Produkt #1",
      place: "a",
      seller: "b",
      warrantyDate: new Date( 2016, 10, 1 ),
      warrantyLength: 2,
    },
    {
      id: "b",
      name: "Produkt #2",
      place: "c",
      seller: "a",
      warrantyDate: new Date( 2017, 10, 1 ),
      warrantyLength: 2,
    },
  ];
}
