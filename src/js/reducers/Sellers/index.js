const initialState = {
  fetched: false,
  fetching: false,
  data: [
    {
      id: "0",
      name: "Dupa sp. z o.o.",
      nip: "000-000-00-00",
      street: "ul. Dupna 2",
      zip: "69-666",
      city: "Dupowo",
    },
  ],
};

export default function reducer(state = initialState) {
  // const newState = Object.assign({}, state, { data: state.data.slice() });
  //
  // switch (action.type) {
  //   // no default
  // }

  return state;
}
