const defaultState = {
  productsLoaded: false,
  productsError: false,
  numberOfPages: 0,
  products: [],
};

const products = (state = defaultState, action) => {
  const newState = {
    ...state,
    products: state.products.map(p => ({ ...p })),
  };

  switch (action.type) {
    case 'PRODUCTS/GET/START':
    case 'PRODUCTS/GET_BY_ID/START': {
      return {
        ...newState,
        productsLoaded: false,
      };
    }

    case 'PRODUCTS/GET_BY_ID/SUCCESS': {
      return {
        ...newState,
        productsLoaded: true,
        products: [action.payload.product],
      };
    }

    case 'PRODUCTS/GET/SUCCESS': {
      return {
        ...newState,
        productsLoaded: true,
        products: action.payload.products,
        numberOfPages: action.payload.numberOfPages,
      };
    }
    // no default
  }

  return newState;
};

export default products;
