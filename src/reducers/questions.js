import * as actions from '../actions/questions';
import { initialQuestions } from './initialState';

export const reducer = ( state = initialQuestions, action ) => {

  if ( action.type === actions.LOAD_QUESTIONS ) {
    return action.questions;
  }

  if ( action.type === actions.UPDATE_QUESTION ) {
    console.log('updateQuestion', action)
    const indexNext = action.indexNext ? action.indexNext : state.questions[action.index].indexNext;
    const answers   = action.answers   ? action.answers   : state.questions[action.index].answers; 
    const correct   = action.correct   ? action.correct   : state.questions[action.index].correct; 
    const score     = action.score     ? action.score     : state.questions[action.index].score;
    const existingQuestion = { ...state.questions[action.index], indexNext, answers, correct, score };
    console.log('existingQuestion', existingQuestion)
    if (action.index === 0){
      console.log('beginning')
      const remainingQuestions = state.questions.slice(1,state.questions.length);
      console.log([existingQuestion, ...remainingQuestions]);
      return [existingQuestion, ...remainingQuestions];
    }
    if (action.index === state.questions.length -1){
      console.log('end')
      const remainingQuestions = state.questions.slice(0,state.questions.length-1);
      console.log( [...remainingQuestions, existingQuestion]);
      return [...remainingQuestions, existingQuestion];
    }
    console.log('middle')
    const remainingQuestionsFront = state.questions.slice(0,action.index);
    const remainingQuestionsBack = state.questions.slice(action.index,state.questions.length);
    console.log([...remainingQuestionsFront, existingQuestion, ...remainingQuestionsBack]);
    return [...remainingQuestionsFront, existingQuestion, ...remainingQuestionsBack];
  }

return state;
}