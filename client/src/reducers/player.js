const player = (state = {}, action) => {
  switch (action.type) {
    case 'BUY_CHARITY':
      return {...state, charity: { active: true, rollsRemaining: 3 }};
    case 'CHARITY_COUNTER':
      let rolls = state.charity.rollsRemaining;
      const newTotal = rolls + action.value
      const active = newTotal > 0 ? true : false
      return {...state, charity: { active, rollsRemaining: newTotal }};
    case 'UPDATE_PAYCHECK':
      return { ...state, paycheck: action.value }
    default:
      return state;
  }
};

export default player;
