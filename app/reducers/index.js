// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history)
  });
}
