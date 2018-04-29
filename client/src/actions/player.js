import { humanize } from '../components/functions';
import { addMessage } from './gamelog';
import { updateIncome } from './incomes';
import { mathMoney } from './wallet';
import { addExpense } from './expenses';

export const buyCharity = (amount) => {
  return dispatch => {
    dispatch(mathMoney(-amount));
    dispatch({ type: 'BUY_CHARITY' });
    dispatch(addMessage(`Charity bought for $${humanize(amount)}, rolls remaining: 3`));
  };
};

export const newBaby = (id, amount, count = 0) => {
  return dispatch => {
    dispatch(addExpense(id, `Baby #${count}`, amount, false))
    dispatch({ type: 'ADD_CHILD', count });
    dispatch(addMessage(`Baby #${count}, congratulations! Cost $${humanize(amount)} / month`));
  };
};

export const charityCounter = (value, current) => {
  return dispatch => {
    current === 1 ? dispatch(addMessage('Charity has ended')) : dispatch(addMessage(`Charity rolls remaining: ${current + value}`));
    dispatch({ type: 'CHARITY_COUNTER', value });
  };
};

export const updateSalary = (id, name, value) => {
  return dispatch => {
    dispatch(updateIncome(id, name, value, false));
    dispatch({ type: "UPDATE_SALARY", value });
    dispatch(addMessage(`Salary updated to: $${humanize(value)}`));
  };
};