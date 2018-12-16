const defaultState = 'light';

const theme = (state = defaultState, action) => {
  switch (action.type) {
    case 'THEME/SWITCH': {
      return state === 'light' ? 'dark' : 'light';
    }
    // no default
  }

  return state;
};

export default theme;