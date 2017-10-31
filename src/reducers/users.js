import * as actions from '../actions/users';
import { initialUser } from './initialState';

export const reducer = ( state = initialUser, action ) => {
  
  if ( action.type === actions.UPDATE_USER_STORE ) {
    console.log('update user store', action);
    return Object.assign({}, state, {
      authToken: action.authToken,
      id: action.id,
      username: action.username,
      firstName: action.firstName,
      lastName: action.lastName,
      badges: action.badges,
      recent: action.recent,
      quizzes: action.quizzes
    })

  } else if ( action.type === 'actions.ADD_QUIZ_USER_LIST' ) {
    return Object.assign({}, state, {
      quizzes: action.quizzes
    })
    
  } else {
    return state;
  }
}