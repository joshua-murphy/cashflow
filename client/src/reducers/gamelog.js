const gamelog = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE': 
      return [ action.message, ...state ];
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

export default gamelog;