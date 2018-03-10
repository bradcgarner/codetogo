import * as actions from '../actions/quiz';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {

  if ( action.type === actions.LOAD_QUIZ ) {
    return action.quiz;
  }
  if ( action.type === actions.UPDATE_QUIZ_SCORE ) {
    return { ...state, score: action.score };
  }
  if ( action.type === actions.UPDATE_QUIZ_INDEX_CURRENT ) {
    // console.log('UPDATE_QUIZ_INDEX_CURRENT', action)
    return {
      ...state, 
      indexCurrent: action.indexCurrent
    };
  }
  if ( action.type === actions.UPDATE_NEXT_STATE ) {
    return {
      ...state, 
      nextState: action.nextState
    };
  }
  if ( action.type === actions.TOGGLE_SHOW_ANSWERS ) {
    return {
      ...state, 
      showingAnswers: action.showingAnswers
    };
  }
  return state;
}

