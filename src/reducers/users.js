import * as actions from '../actions/users';
import { initialUser } from './initialState';
const deepAssign = require('deep-assign');

export const reducer = ( state = initialUser, action ) => {
  
  if ( action.type === actions.UPDATE_USER_STORE ) {
    return deepAssign({}, state, { // 2 levels deep with quizzes, do deep assign
      authToken: action.authToken,
      id: action.id,
      username: action.username,
      firstName: action.firstName,
      lastName: action.lastName,
      badges: action.badges,
      recent: action.recent,
      quizzes: action.quizzes
    })

  } else if ( action.type === actions.UPDATE_SCORE_FROM_CACHE ) {
    const quizzes = [...state.quizzes];  // quizzes is 1 level deep, no deep assign needed
    const index = quizzes.findIndex(quiz=> quiz.id === action.quizId )
    quizzes[index].completed = action.completed;
    quizzes[index].correct = action.correct;
    return { ...state,  quizzes };

  } else if ( action.type === actions.ADD_QUIZ ) {
    const quizzes = [...state.quizzes];  // quizzes is 1 level deep, no deep assign needed
    console.log('action in user reducer',action);
    quizzes.push(action.quiz);
    console.log('quizzes in user reducer after adding',quizzes);
    return { ...state,  quizzes };

  } else if ( action.type === actions.INCREMENT_ATTEMPT ) {
    const quizzes = [...state.quizzes];  // quizzes is 1 level deep, no deep assign needed
    const index = quizzes.findIndex(quiz=> quiz.id === action.quizId )
    quizzes[index].attempt = action.attempt;
    return { ...state,  quizzes };
    
  } else {
    return state;
  }
};