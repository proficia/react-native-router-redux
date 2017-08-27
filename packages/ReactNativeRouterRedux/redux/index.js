import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export default function createAppStore(state, history) {
  return createStore(
    combineReducers({
      router: routerReducer,
    }),
    state,
    applyMiddleware(
      routerMiddleware(history),
    ),
  );
}