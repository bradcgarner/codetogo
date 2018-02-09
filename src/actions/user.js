// this is the user who is logged in

import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsQuiz from './quiz';

// user has only a few keys, so only 1 action: full replacement
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
  user
});

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@


export const login = (credentials) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  // const auth = `${credentials.username}:${credentials.password}`; // u & pw as string
  // const headers = {
  //   "Authorization": "Basic " + btoa(auth), // base64 encryption
  // }; 
  const init = { 
    method: 'POST',
    body: credentials,
  };
  let fetchedUser;
  console.log('init', init);
  return fetch(url, init)    // <<<<<<< NOT WORKING ON IOS !!!!!!
  .then(res=>{
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(user=>{
    console.log('user returned at login', fetchedUser);    
    return fetchedUser = user;    
  })
  .then(() => { 
    dispatch(loadUser(fetchedUser));
    console.log('END LOGIN. USER STORE IS UPDATED WITH:', fetchedUser);
    if (fetchedUser.quizzes.length > 0 ) {
      return dispatch(actionsMode.gotoDashboard());      
    } else {
      return dispatch(actionsMode.gotoQuizlist());
    }
  })
  .catch(error => {
   dispatch(actionsMode.showModal(error));
  });
    
  
}
// create new user
export const createUser = (credentials) => dispatch => { //credential should include   username, password, firstName, lastName  
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = { "Content-Type": "application/json", "x-requested-with": "xhr" };
  const init = { 
    method: 'POST',
    body: JSON.stringify(credentials),
    headers
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{ //response user api repr firstName, lastName, username, id
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    user.quizzes = [];
    user.recent = [];
    user.badges = [];
    dispatch(loadUser(user));
  })
  .then(()=>{
    return dispatch(actionsMode.gotoLogin());
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}

//update user core profile: username, password, firstName, lastName
export const updateUserProfile = (credentials, authToken) => dispatch => { //credentials MAY include username, password, firstName, lastName
  const url = `${REACT_APP_BASE_URL}/api/users/${credentials.id}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
    "x-requested-with": "xhr"
  };
  const init = { 
    method: 'PUT',
    body: JSON.stringify(credentials),
    headers
  };
  console.log('url', url, 'init', init);
  return fetch(url, init)
  .then(res=>{   //response user api repr (no need to do anything with it) 
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(user => { 
    user.authToken = authToken;
    return dispatch(loadUser(user));
    // let user know profile is updated
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}