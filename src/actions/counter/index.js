import { INCREMENT, INCREMENT_ASYNC } from './actionNames';

export const increment = () => ({
  type: INCREMENT,
});

export const incrementAsync = () => ({
  type: INCREMENT_ASYNC,
});
