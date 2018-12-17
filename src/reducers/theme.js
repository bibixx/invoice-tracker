const defaultState = localStorage.getItem('theme') || 'light';
// const defaultState = 'dark';

const theme = (state = defaultState, action) => {
  switch (action.type) {
    case 'THEME/SWITCH': {
      const newState = state === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', newState);
      return newState;
    }
    // no default
  }

  return state;
};

export default theme;
