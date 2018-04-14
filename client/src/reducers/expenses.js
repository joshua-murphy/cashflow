const expenses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE': 
      const { id, name, value } = action;
      return [ ...state, { id, name, value } ];
    // case 'REMOVE_EXPENSE':
    //   return [];
    default:
      return state;
  }
};

export default expenses;