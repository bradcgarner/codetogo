import * as actions from '../actions/general';
import { initialGeneral } from './initialState';

export const reducer = ( state = initialGeneral, action ) => {

  // used at app initialization, not updated
  if ( action.type === actions.LOAD_MENU_OF_QUIZZES ) {
    console.log('action in general reducer',action)
    return {...state, menuOfAllQuizzes: action.menuOfAllQuizzes};
  }
  
  return state;
};