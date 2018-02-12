// general are non user-specific items, such as value lists that initialize and do not change per user

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
import 'whatwg-fetch';
  
// used at app initialization, not updated
export const LOAD_MENU_OF_QUIZZES = 'LOAD_MENU_OF_QUIZZES';
export const loadMenuOfAllQuizzes = menuOfAllQuizzes => ({
  type: LOAD_MENU_OF_QUIZZES,
  menuOfAllQuizzes,    
});

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@

export const initialize = () => dispatch => {
  
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/initialize`;
  const init = { 
    method: 'GET',
  };
  return fetch(url, init) 
  .then(initializationObject=>{
    if (!initializationObject.ok) { 
      return Promise.reject(initializationObject.statusText);
    }
    return initializationObject.json();
  })
  .then(initializationObject=>{
    dispatch(loadMenuOfAllQuizzes(initializationObject.quizzes));
    return dispatch(actionsDisplay.closeLoading());
  })
  .catch(err => {
    const error = typeof err === 'string' ? err :
      typeof err === 'object' && err.message ? err.message :
      'something went wrong';
    dispatch(actionsDisplay.showModal(error));
  });
};