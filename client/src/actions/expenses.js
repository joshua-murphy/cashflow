import { addMessage } from './gamelog'

export const addExpense = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "ADD_EXPENSE", id, name, value})
    createMessage && dispatch(addMessage(`Monthly expense added: ${name} for $${value} / month`))
  }
}