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
    case "ADD_RECORD": {
      const dateArr = action.payload.warrantyDate.split( "-" );
      const newData = Object.assign( {}, action.payload, { warrantyDate: new Date( dateArr[ 0 ], dateArr[ 1 ] - 1, dateArr[ 2 ] ) } );
      newData.warrantyLength *= 1;
      newState.data.push( newData );

      return newState;
    }
    case "FETCHED_RECORDS": {
      const stateFetched = action.payload.map( ( v ) => {
        const dateArr = v.warrantyDate.split( "-" );
        return Object.assign( {}, v, { warrantyDate: new Date( dateArr[ 0 ], dateArr[ 1 ] - 1, dateArr[ 2 ] ) } );
      } );

      newState.data = stateFetched;
      newState.fetched = true;
      newState.fetching = false;

      return newState;
    }
    // no default
  }

  return state;
}
