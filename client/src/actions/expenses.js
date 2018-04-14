import { addMessage } from './gamelog'

export const addExpense = (id, name, value) => {
  return dispatch => {
    dispatch({type: "ADD_EXPENSE", id, name, value})
    dispatch(addMessage(`Monthly expense added: ${name} for $${value}`))
  }
}