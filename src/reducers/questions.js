import * as actions from '../actions/questions';
import { initialQuestions } from './initialState';
import { updateQuestion } from '../actions/questions';

export const reducer = ( state = initialQuestions, action ) => {

  if ( action.type === actions.LOAD_QUESTIONS ) {
    return action.questions;
  }

  if ( action.type === actions.UPDATE_QUESTION ) {
    console.log('updateQuestion', action)
    const indexNext = typeof action.indexNext === 'number' ? action.indexNext : state[action.index].indexNext;
    if(indexNext !== action.indexNext) console.log('#################', action.indexNext, 'prev', state[action.index].indexNext);
    const score     = action.score     ? action.score     : state[action.index].score;
    const questionToUpdate = { ...state[action.index], indexNext, score };
    console.log('questionToUpdate', questionToUpdate);
    if (action.index === 0){
      const remainingQuestions = state.slice(1,state.length);
      console.log('update first question', remainingQuestions.length, remainingQuestions)
      // console.log(' ')
      const newQuestions = [questionToUpdate, ...remainingQuestions];
      console.log('newQuestions first', newQuestions);
      return newQuestions;
    }
    if (action.index === state.length -1){
      const remainingQuestions = state.slice(0,state.length-1);
      console.log('update last question', remainingQuestions.length, remainingQuestions)
      // console.log(' ')
      const newQuestions =  [...remainingQuestions, questionToUpdate];
      console.log('newQuestions last', newQuestions);
      return newQuestions;
    }
    const remainingQuestionsFront = state.slice(0,action.index);
    const remainingQuestionsBack = state.slice(action.index+1,state.length);
    console.log('update middle question front', remainingQuestionsFront.length, remainingQuestionsFront)
    console.log('update middle question back', remainingQuestionsBack.length, remainingQuestionsBack)
    // console.log(' ')
    const newQuestions = [...remainingQuestionsFront, questionToUpdate, ...remainingQuestionsBack];
    console.log('newQuestions middle', newQuestions);
    return newQuestions;
  }

return state;
}