const player = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROFESSION':
      return {...state, profession: action.profession}
    case 'BUY_CHARITY':
      return {...state, charity: { active: true, rollsRemaining: 3 }};
    case 'ADD_CHILD':
      return {...state, children: action.count};
    case 'CHARITY_COUNTER':
      let rolls = state.charity.rollsRemaining;
      const newTotal = rolls + action.value
      const active = newTotal > 0 ? true : false
      return {...state, charity: { active, rollsRemaining: newTotal }};
    case 'UPDATE_SALARY':
      return { ...state, profession: { ...state.profession, salary: action.value } }
    default:
      return state;
  }
};

export default player;
