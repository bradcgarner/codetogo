import * as actions from '../actions/questions';
import { initialQuestions } from './initialState';

export const reducer = ( state = initialQuestions, action ) => {

  if ( action.type === actions.LOAD_QUESTIONS ) {
    return action.questions;
  }

  if ( action.type === actions.UPDATE_QUESTION ) {
    const indexNext = action.indexNext ? action.indexNext : state[action.index].indexNext;
    const answers   = action.answers   ? action.answers   : state[action.index].answers; 
    const correct   = action.correct   ? action.correct   : state[action.index].correct; 
    const score     = action.score     ? action.score     : state[action.index].score;
    const existingQuestion = { ...state[action.index], indexNext, answers, correct, score };
    if (action.index === 0){
      const remainingQuestions = state.slice(1,state.length);
      return [existingQuestion, ...remainingQuestions];
    }
    if (action.index === state.length -1){
      const remainingQuestions = state.slice(0,state.length-1);
      return [...remainingQuestions, existingQuestion];
    }
    const remainingQuestionsFront = state.slice(0,action.index);
    const remainingQuestionsBack = state.slice(action.index,state.length);
    return [...remainingQuestionsFront, existingQuestion, ...remainingQuestionsBack];
  }

return state;
}