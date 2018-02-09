import * as actions from '../actions/quizList';
import { initialQuizList } from './initialState';

export const reducer = ( state = initialMode, action ) => {
  if ( action.type === actions.LOAD_QUIZ_LIST ) {
    return action.quizList;
  }
  if ( action.type === actions.ADD_QUIZ ) {
    return [...state, action.quiz];
  } 
  return state;
}