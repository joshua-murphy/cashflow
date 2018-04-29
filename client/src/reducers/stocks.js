const stocks = (state = [], action) => {
  const { name, count, multiplier } = action;
  switch (action.type) {
    case 'ADD_STOCK': 
      return state.map( stock => {
        if(stock.name === name)
          return { name, count: stock.count + count }
        return stock
      })
    case 'REMOVE_STOCK':
      return state.map( stock => {
        if(stock.name === name)
          return { name, count: stock.count - count }
        return stock
      })    
    case 'SPLIT_STOCK':
      return state.map( stock => {
        if(stock.name === name)
          return { name, count: stock.count * multiplier }
        return stock
      })    
    default:
      return state;
  }
};

export default stocks;