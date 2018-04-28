import { humanize } from '../components/functions';
import { addMessage } from './gamelog'

export const addExpense = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "CREATE_EXPENSE", id, name, value})
    createMessage && dispatch(addMessage(`Monthly expense added: ${name} for $${humanize(value)} / month`))
  }
}

export const updateIncome = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "UPDATE_EXPENSE", id, value})
    createMessage && dispatch(addMessage(`${name} income updated to $${humanize(value)} / month`))
  }
}