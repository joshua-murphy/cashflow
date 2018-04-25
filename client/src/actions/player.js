import { addMessage } from './gamelog';
import { editIncome } from './incomes';
import { mathMoney } from './wallet';

export const buyCharity = (amount) => {
  return dispatch => {
    dispatch(mathMoney(-amount));
    dispatch({ type: 'BUY_CHARITY' });
    dispatch(addMessage(`Charity bought for $${amount}, rolls remaining: 3`));
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
    dispatch(editIncome(id, name, value, false));
    dispatch({ type: "UPDATE_SALARY", value });
    dispatch(addMessage(`Salary updated to: $${value}`));
  };
};