import * as actions from '../actions/questions';
import { initialQuestions } from './initialState';

export const reducer = ( state = initialQuestions, action ) => {

  if ( action.type === actions.LOAD_QUESTIONS ) {
    return action.questions;
  }

  if ( action.type === actions.UPDATE_QUESTION ) {
    const indexNext = typeof action.indexNext === 'number' ? action.indexNext : state[action.index].indexNext;
    const score     = action.score     ? action.score     : state[action.index].score;
    const questionToUpdate = { ...state[action.index], indexNext, score };
    if (action.index === 0){
      const remainingQuestions = state.slice(1,state.length);
      const newQuestions = [questionToUpdate, ...remainingQuestions];
      return newQuestions;
    }
    if (action.index === state.length -1){
      const remainingQuestions = state.slice(0,state.length-1);
      const newQuestions =  [...remainingQuestions, questionToUpdate];
      return newQuestions;
    }
    const remainingQuestionsFront = state.slice(0,action.index);
    const remainingQuestionsBack = state.slice(action.index+1,state.length);
    const newQuestions = [...remainingQuestionsFront, questionToUpdate, ...remainingQuestionsBack];
    return newQuestions;
  }

return state;
}