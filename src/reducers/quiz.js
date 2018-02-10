import * as actions from '../actions/quiz';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {

  if ( action.type === actions.LOAD_QUIZ ) {
    return action.quiz;
  }
  if ( action.type === actions.UPDATE_QUIZ_SCORE ) {
    return {
      ...state, 
      score: action.score, 
    };
  }
  if ( action.type === actions.UPDATE_QUIZ_INDEX ) {
    return {
      ...state, 
      indexCurrent: action.indexCurrent
    };
  }
  return state;
}

