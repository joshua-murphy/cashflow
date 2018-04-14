// import axios from 'axios';
import { addMessage } from '../actions/gamelog';
import { mathMoney } from '../actions/wallet';

export const buyCharity = (amount) => {
  return dispatch => {
    dispatch({ type: 'BUY_CHARITY' });
    dispatch(mathMoney(-amount));
    dispatch(addMessage('Charity bought, rolls remaining: 3'));
    // dispatch({ type: 'SUBTRACT_MONEY' });
  };
};

export const charityCounter = (value, current) => {
  return dispatch => {
    current === 1 ? dispatch(addMessage('Charity has ended')) : dispatch(addMessage(`Charity rolls remaining: ${current + value}`));
    dispatch({ type: 'CHARITY_COUNTER', value });
  };
};

export const updatePaycheck = (value) => {
  return dispatch => {
    dispatch({ type: "UPDATE_PAYCHECK", value });
    dispatch(addMessage(`Paycheck updated to: $${value}`));
  }
}
