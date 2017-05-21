import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    createLogger({collapsed: true}),
    thunk))
  );

