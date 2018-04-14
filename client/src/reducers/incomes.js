const incomes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_INCOME': 
      const { id, name, value } = action;
      return [ ...state, { id, name, value } ];    
    // case 'REMOVE_INCOME':
    //   return [];
    default:
      return state;
  }
};

export default incomes;