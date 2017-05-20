export default function reducer(
  state = {
    fetched: false,
    fetching: false,
    data: [],
  },
  action,
) {
  const newState = Object.assign( {}, state, { data: state.data.slice() } );

  switch ( action.type ) {
    case "ADD_SELLER":
      newState.data.push( Object.assign( { id: Math.random().toString( 36 ).substring( 7 ) }, action.payload ) );

      return newState;

    case "EDIT_SELLER": {
      newState.data = newState.data.map( ( v ) => {
        if ( v.id === action.payload.id ) {
          return Object.assign( {}, action.payload );
        }
        return v;
      } );

      return newState;
    }

    case "FETCHED_SELLERS": {
      const stateFetched = action.payload.map( v => Object.assign( {}, v ) );

      newState.data = stateFetched;
      newState.fetched = true;
      newState.fetching = false;

      return newState;
    }
    // no default
  }

  return state;
}
