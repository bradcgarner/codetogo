// general are non user-specific items, such as value lists that initialize and do not change per user

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
import 'whatwg-fetch';
  
// used at app initialization, not updated
export const LOAD_LIST_OF_QUIZZES = 'LOAD_LIST_OF_QUIZZES';
export const loadListOfAllQuizzes = listOfAllQuizzes => ({
  type: LOAD_LIST_OF_QUIZZES,
  listOfAllQuizzes,    
});

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@

export const initialize = () => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/initialize`;
  const init = { 
    method: 'GET',
  };
  return fetch(url, init) 
  .then(initializationObject=>{
    dispatch.loadListOfAllQuizzes(initializationObject.quizzes);
  })
  .catch(err=>{
    dispatch.actionsDisplay.showModal(err);
  });
};