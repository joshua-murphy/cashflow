import { addMessage } from './gamelog';

export const setProfession = (profession) => {
  return dispatch => {
    dispatch(addMessage(`Began career as a ${profession.title}!`));
    dispatch({ type: "SET_PROFESSION", profession });
  }
}