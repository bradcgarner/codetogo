import * as actions from '../actions/users';
import { initialUser } from './initialState';

export const reducer = ( state = initialUser, action ) => {
  
  // user has only a few keys, so only 1 action: full replacement
  if ( action.type === actions.LOAD_USER ) {
    return action.user;
  }
  
  return state;
}