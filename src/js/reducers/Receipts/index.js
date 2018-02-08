const initialState = {
  fetched: false,
  fetching: false,
  data: [
    {
      id: "0",
      name: "Dupa",
      place: "0",
      seller: "0",
      buyingDate: 1483225200,
      warrantyLength: 0.5,
      notes: "",
      files: [""],
    },
    {
      id: "1",
      name: "Dupa 2",
      place: "0",
      seller: "1",
      buyingDate: 1485903600,
      warrantyLength: 2,
      notes: "",
      files: [""],
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
