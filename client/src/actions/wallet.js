import { addMessage } from './gamelog';

export const mathMoney = (amount, message) => {
  return dispatch => {
    dispatch({ type: "MATH_MONEY", amount })
    dispatch(addMessage(message))
  }
}