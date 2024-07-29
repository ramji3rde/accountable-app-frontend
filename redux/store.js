import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default function configureStore() {
  return createStore(rootReducer, composedEnhancer);
}
