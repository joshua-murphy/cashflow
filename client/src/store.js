import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from 'redux-devise-axios';
import rootReducer from './reducers/index';
import axios from 'axios';

const options = { axios };

const enhancers = compose(
  applyMiddleware(thunk, apiMiddleware(options)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const initialState = {
  player: { charity: { active: false }, profession: {} },
  wallet: 0
}

const store = createStore(rootReducer, initialState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;