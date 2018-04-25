import { addMessage } from './gamelog';

export const mathMoney = (amount, message) => {
  amount = parseInt(amount, 10)
  return dispatch => {
    dispatch({ type: "MATH_MONEY", amount })
    message && dispatch(addMessage(message))
  }
}