import { addMessage } from './gamelog'

export const addIncome = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "ADD_INCOME", id, name, value})
    createMessage && dispatch(addMessage(`Monthly income added: ${name} for $${value} / month`))
  }
}

export const editIncome = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "EDIT_INCOME", id, name, value})
    createMessage && dispatch(addMessage(`Monthly income updated: ${name} for $${value} / month`))
  }
}