const wallet = (state = {}, action) => {
  switch (action.type) {
    case 'MATH_MONEY': 
      const initialAmount = state;
      return initialAmount + action.amount;
    default:
      return state;
  }
};

export default wallet;