const stocks = (state = [], action) => {
  const { id, name, value } = action;
  switch (action.type) {
    case 'ADD_STOCK': 
      return [ ...state, { id, name, value } ];
    // case 'REMOVE_INCOME':
    //   return [];
    default:
      return state;
  }
};

export default stocks;