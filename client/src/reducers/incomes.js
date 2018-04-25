const incomes = (state = [], action) => {
  const { id, name, value } = action;
  switch (action.type) {
    case 'ADD_INCOME': 
      return [ ...state, { id, name, value } ];    
    case 'EDIT_INCOME':
      return state.map( income => {
        if(income.id === id)
          return { id, name, value: action.value };
        return income;
        });
    // case 'REMOVE_INCOME':
    //   return [];
    default:
      return state;
  }
};

export default incomes;