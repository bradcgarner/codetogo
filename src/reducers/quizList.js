import * as actions from '../actions/quizList';
import { initialQuizList } from './initialState';

// store.quizList is an array, not an object with properties

export const reducer = ( state = initialQuizList, action ) => {
  if ( action.type === actions.LOAD_QUIZ_LIST ) {
    return action.quizList;
  }
  if ( action.type === actions.ADD_QUIZ ) {
    return {...state, [action.quiz.id]: action.quiz};
  } 
  if ( action.type === actions.UPDATE_QUIZLIST_SCORE ) {
    const quiz = {...state[action.idQuiz]};
    quiz.score = action.score;
    return {...state, [action.idQuiz]: quiz};
  } 
  
  return state;
}