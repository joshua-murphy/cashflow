import { combineReducers } from 'redux';
import player from './player';
import gamelog from './gamelog';
import wallet from './wallet';
import expenses from './expenses';
import incomes from './incomes';
import stocks from './stocks';

const rootReducer = combineReducers({
  player,
  wallet,
  incomes,
  expenses,
  stocks,
  gamelog,
});

export default rootReducer;
