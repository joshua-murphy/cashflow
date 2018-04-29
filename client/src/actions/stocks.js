import { humanize } from '../components/functions';
import { addMessage } from './gamelog';
import { mathMoney } from './wallet';

export const addStock = (id, name, price, count) => {
  return dispatch => {
    const value = price * count
    dispatch(mathMoney(-value))
    dispatch({type: "ADD_STOCK", id, name, count})
    dispatch(addMessage(`Bought ${humanize(count)} ${name} stock at $${humanize(price)} each for $${humanize(value)}`))
  }
}

export const removeStock = (id, name, price, count) => {
  return dispatch => {
    const value = price * count
    dispatch(mathMoney(value))
    dispatch({type: "REMOVE_STOCK", id, name, count})
    dispatch(addMessage(`Sold ${humanize(count)} ${name} stock at $${humanize(price)} each for $${humanize(value)}`))
  }
}