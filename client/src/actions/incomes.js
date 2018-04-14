import { addMessage } from './gamelog'

export const addIncome = (id, name, value) => {
  return dispatch => {
    dispatch({type: "ADD_INCOME", id, name, value})
    dispatch(addMessage(`Monthly income added: ${name} for $${value}`))
  }
}