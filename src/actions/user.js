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

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@

export const login = (credentials) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const init = { 
    method: 'POST',
    body: JSON.stringify(credentials),
  };
  console.log('init', init);
  return fetch(url, init) 
  .then(userFound=>{
    if (!userFound.ok) { 
      return Promise.reject(userFound.statusText);
    }
    return userFound.json();
  })
  .then(userFound=>{
    console.log('user returned at login', userFound);    
    dispatch(loadUser(userFound.user));
    dispatch(actionsActivity.loadActivity(userFound.activity));
    dispatch(actionsBadges.loadBadges(userFound.badges));
    return dispatch(actionsQuizList.loadQuizList(userFound.quizList));
  })
  .catch(error => {
   dispatch(actionsDisplay.showModal(error));
  });
}

// create new user
export const createUser = credentials => dispatch => { //credential should include   username, password, firstName, lastName  
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = { 'Content-Type': 'application/json' };
  const init = { 
    method: 'POST',
    body: JSON.stringify(credentials),
    headers
  };
  console.log('init', init);
  return fetch(url, init)
  .then(userFound=>{ //response user api repr firstName, lastName, username, id
    if (!userFound.ok) { 
      return Promise.reject(userFound.statusText);
    }
    return userFound.json();
  }) 
  .then(userFound => { 
    console.log('userFound', userFound);
    dispatch(loadUser(userFound.user));
    dispatch(actionsActivity.loadActivity([]));
    dispatch(actionsBadges.loadBadges([]));
    return dispatch(actionsQuizList.loadQuizList([]));
  })
  .catch(error => {
    dispatch(actionsDisplay.showModal(error));
  });
}

//update user core profile: username, password, firstName, lastName
export const updateUser = (credentials, authToken) => dispatch => { //credentials MAY include username, password, firstName, lastName
  const url = `${REACT_APP_BASE_URL}/api/users/${credentials.id}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
  };
  const init = { 
    method: 'PUT',
    body: JSON.stringify(credentials),
    headers
  };
  console.log('url', url, 'init', init);
  return fetch(url, init)
  .then(userUpdated=>{   //response user api repr (no need to do anything with it) 
    console.log(userUpdated);
    if (!userUpdated.ok) { 
      return Promise.reject(userUpdated.statusText);
    }
    return userUpdated.json();
  }) 
  .then(userUpdated => { 
    userUpdated.authToken = authToken;
    return dispatch(loadUser(userUpdated));
    // let user know profile is updated
  })
  .catch(error => {
    dispatch(actionsDisplay.showModal(error));
  });
}