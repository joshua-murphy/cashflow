const expenses = (state = [], action) => {
  const { id, name, value } = action;
  switch (action.type) {
    case 'CREATE_EXPENSE': 
      return [ ...state, { id, name, value } ];
    case 'UPDATE_EXPENSE':
      return state.map( expense => {
        if(expense.id === id)
          return { id, name: expense.name, value };
        return expense;
        });
    // case 'REMOVE_EXPENSE':
    //   return [];
    default:
      return state;
  }
};

export default expenses;