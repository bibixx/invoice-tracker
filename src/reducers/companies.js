const defaultState = {
  companiesLoaded: false,
  companiesError: false,
  numberOfPages: 0,
  companies: [],
};

const companies = (state = defaultState, action) => {
  const newState = {
    ...state,
    companies: state.companies.map(c => ({ ...c })),
  };

  switch (action.type) {
    case 'COMPANIES/GET/START': {
      return {
        ...newState,
        companiesLoaded: false,
        companiesError: false,
      };
    }
    case 'COMPANIES/GET/SUCCESS': {
      return {
        ...newState,
        companiesLoaded: true,
        companies: action.payload.companies,
        numberOfPages: action.payload.numberOfPages,
      };
    }
    case 'COMPANIES/GET/ERROR': {
      return {
        ...newState,
        companiesLoaded: true,
        companiesError: action.payload.error,
      };
    }

    // no default
  }

  return newState;
};

export default companies;
