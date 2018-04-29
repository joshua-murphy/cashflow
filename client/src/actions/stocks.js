import { humanize } from '../components/functions';
import { addMessage } from './gamelog';
import { mathMoney } from './wallet';

export const addStock = (name, price, count) => {
  return dispatch => {
    const value = price * count
    dispatch(mathMoney(-value))
    dispatch({type: "ADD_STOCK", name, count})
    dispatch(addMessage(`Bought ${humanize(count)} ${name} stock at $${price} each for $${humanize(value)}`))
  }
}

export const removeStock = (name, price, count) => {
  return dispatch => {
    const value = price * count
    dispatch(mathMoney(value))
    dispatch({type: "REMOVE_STOCK", name, count})
    dispatch(addMessage(`Sold ${humanize(count)} ${name} stock at $${price} each for $${humanize(value)}`))
  }
}

export const splitStock = (name, multiplier) => {
  return dispatch => {
    dispatch({type: "SPLIT_STOCK", name, multiplier})    
  }
}