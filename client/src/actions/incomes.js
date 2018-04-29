import { humanize } from '../components/functions';
import { addMessage } from './gamelog'

export const addIncome = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "ADD_INCOME", id, name, value})
    createMessage && dispatch(addMessage(`Monthly income added: ${name} for $${humanize(value)} / month`))
  }
}

export const updateIncome = (id, name, value) => {
  return dispatch => {
    dispatch({type: "EDIT_INCOME", id, name, value})
    dispatch(addMessage(`Monthly income updated: ${name} for $${humanize(value)} / month`))
  }
}