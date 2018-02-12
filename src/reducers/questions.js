import * as actions from '../actions/questions';
import { initialQuestions } from './initialState';

export const reducer = ( state = initialQuestions, action ) => {

  if ( action.type === actions.LOAD_QUESTIONS ) {
    return action.questions;
  }

  if ( action.type === actions.UPDATE_QUESTION ) {
    const existingQuestion = {
      ...state.questions[action.index],
      indexNext: action.indexNext || state.questions[action.index].indexNext,
      answers:   action.answers   || state.questions[action.index].answers, 
      correct:   action.correct   || state.questions[action.index].correct, 
      score:     action.score     || state.questions[action.index].score,
    }
    if (action.index === 0){
      const remainingQuestions = state.questions.slice(1,state.questions.length);
      return [existingQuestion, ...remainingQuestions];
    }
    if (action.index === state.questions.length -1){
      const remainingQuestions = state.questions.slice(0,state.questions.length-1);
      return [...remainingQuestions, existingQuestion];
    }
    if (action.index >0 && action.index < state.questions.length ) {
      const remainingQuestionsFront = state.questions.slice(0,action.index);
      const remainingQuestionsBack = state.questions.slice(action.index,state.questions.length);
      return [...remainingQuestionsFront, existingQuestion, ...remainingQuestionsBack];
    }
  }

return state;
}