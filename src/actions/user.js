// this is the user who is logged in

import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsQuizList from './quizList';
import * as actionsBadges from './badges';
import * as actionsActivity from './activity';

// user has only a few keys, so only 1 action: full replacement
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
  user
});

// @@@@@@@@@@@@@@@@@ HELPERS @@@@@@@@@@@@@@@@@@@

export const convertArrayToObject = (array, key) => {
  const object = {};
  array.forEach(item=>{
    object[item[key]] = item;
  });
  return object;
}

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@

export const login = credentials => dispatch => {
  
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const headers = {'Content-Type': 'application/json'};
  const init = { 
    method: 'POST',
    body: JSON.stringify(credentials),
    headers
  };
  return fetch(url, init) 
  .then(userFound=>{
    if (!userFound.ok) { 
      return Promise.reject(userFound.statusText);
    }
    return userFound.json();
  })
  .then(userFound=>{
    dispatch(loadUser(userFound.user));
    dispatch(actionsActivity.loadActivity(userFound.activity));
    dispatch(actionsBadges.loadBadges(userFound.badges));
    const quizList = convertArrayToObject(userFound.quizList, 'id');
    dispatch(actionsQuizList.loadQuizList(quizList));
    return dispatch(actionsDisplay.closeLoading());

  })
  .catch(err => {
    const error = typeof err === 'string' ? err :
      typeof err === 'object' && err.message ? err.message :
      'something went wrong';
   dispatch(actionsDisplay.showModal(error));
  });
}

// create new user
export const createUser = newUser => dispatch => { //credential should include   username, password, firstName, lastName  
  
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = { 'Content-Type': 'application/json' };
  const init = { 
    method: 'POST',
    body: JSON.stringify(newUser),
    headers
  };
  return fetch(url, init)
  .then(userFound=>{ 
    if (!userFound.ok) { 
      return Promise.reject(userFound.statusText);
    }
    return userFound.json();
  }) 
  .then(userFound => { 
    dispatch(loadUser(userFound.user));
    dispatch(actionsActivity.loadActivity([]));
    dispatch(actionsBadges.loadBadges([]));
    dispatch(actionsQuizList.loadQuizList([]));
    return dispatch(actionsDisplay.closeLoading());
  })
  .catch(err => {
    const error = typeof err === 'string' ? err :
      typeof err === 'object' && err.message ? err.message :
      'something went wrong';
    dispatch(actionsDisplay.showModal(error));
  });
}

//update user core profile: username, password, firstName, lastName
export const updateUser = (userToUpdate, authToken) => dispatch => { //credentials MAY include username, password, firstName, lastName
  
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/users/${userToUpdate.id}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
  };
  const init = { 
    method: 'PUT',
    body: JSON.stringify(userToUpdate),
    headers
  };
  return fetch(url, init)
  .then(userUpdated=>{   //response user api repr (no need to do anything with it) 
    if (!userUpdated.ok) { 
      return Promise.reject(userUpdated.statusText);
    }
    return userUpdated.json();
  }) 
  .then(userUpdated => { 
    userUpdated.authToken = authToken;
    dispatch(loadUser(userUpdated));
    return dispatch(actionsDisplay.closeLoading());
    // let user know profile is updated
  })
  .catch(err => {
    const error = typeof err === 'string' ? err :
      typeof err === 'object' && err.message ? err.message :
      'something went wrong';
    dispatch(actionsDisplay.showModal(error));
  });
}