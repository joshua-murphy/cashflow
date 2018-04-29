import { humanize } from '../components/functions';
import { addMessage } from './gamelog'

export const addExpense = (id, name, value, createMessage) => {
  return dispatch => {
    dispatch({type: "CREATE_EXPENSE", id, name, value})
    createMessage && dispatch(addMessage(`Monthly expense added: ${name} for $${humanize(value)} / month`))
  }
}

export const updateExpense = ({id, name, value}) => {
  return dispatch => {
    dispatch({type: "UPDATE_EXPENSE", id, value})
    dispatch(addMessage(`${name} expense updated to $${humanize(value)} / month`))
  }
}