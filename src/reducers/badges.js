import * as actions from '../actions/badges';
import { initialBadges } from './initialState';

// store.badges is an array, not an object with properties

export const reducer = ( state = initialBadges, action ) => {
  // this expects an array of all badges, used at login
  if ( action.type === actions.LOAD_BADGES ) {
    return action.badges;
  }
  
  // this expects an object of 1 badge, used intermittently
  if ( action.type === actions.ADD_BADGE ) {
    return [...state, action.badge];
  }
  
  return state;
};