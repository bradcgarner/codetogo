import * as actions from '../actions/quiz';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {

  if ( action.type === actions.LOAD_QUIZ ) {
    return action.quiz;
  }
  if ( action.type === actions.UPDATE_QUIZ_SCORE_AND_INDEX ) {
    return {
      ...state, 
      score: action.score, 
      indexCurrent: action.indexCurrent
    };
  }
  return state;
}

