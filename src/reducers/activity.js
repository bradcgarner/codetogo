import * as actions from '../actions/activity';
import { initialActivity } from './initialState';

export const reducer = ( state = initialActivity, action ) => {
  // this expects an array of all activity, used at login
  if ( action.type === actions.LOAD_ACTIVITY ) {
    return action.activity;
  }

  // this expects an object of 1 activity item, used intermittently
  if ( action.type === actions.ADD_ACTIVITY ) {
    return [...state, action.activity];
  }
  
  return state;
}