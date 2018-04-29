const stocks = (state = [], action) => {
  const { id, name, count } = action;
  switch (action.type) {
    case 'ADD_STOCK': 
      return [ ...state, { id, name, count } ];
    // case 'REMOVE_INCOME':
    //   return [];
    default:
      return state;
  }
};

export default stocks;