const expenses = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_EXPENSE': 
      const { id, name, value } = action;
      return [ ...state, { id, name, value } ];
    case 'UPDATE_EXPENSE':
      return state.map( expense => {
        if(expense.id === id)
          return { id, name, value: action.value };
        return expense;
        });
    // case 'REMOVE_EXPENSE':
    //   return [];
    default:
      return state;
  }
};

export default expenses;