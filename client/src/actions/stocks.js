import { humanize } from '../components/functions';
import { addMessage } from './gamelog';
import { mathMoney } from './wallet';

export const addStock = (id, name, price, count) => {
  return dispatch => {
    const total = price * count
    dispatch(mathMoney(-total))
    dispatch({type: "ADD_STOCK", id, name, total})
    dispatch(addMessage(`Bought ${humanize(count)} ${name} stock at ${humanize(price)} for $${humanize(total)}`))
  }
}

export const removeStock = (id, name, price, count) => {
  return dispatch => {
    const total = price * count
    dispatch(mathMoney(total))
    dispatch({type: "REMOVE_STOCK", id, name, total})
    dispatch(addMessage(`Sold ${humanize(count)} ${name} stock at ${humanize(price)} for $${humanize(total)}`))
  }
}