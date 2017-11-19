import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
const deepAssign = require('deep-assign');


export const UPDATE_USER_STORE = 'UPDATE_USER_STORE';
export const updateUserStore = user => {
  return deepAssign({}, user, {  type: UPDATE_USER_STORE } )
}

export const UPDATE_SCORE_FROM_CACHE = 'UPDATE_SCORE_FROM_CACHE';
export const updateScoreFromCache = (quizId, completed, correct) => ({
  type: UPDATE_SCORE_FROM_CACHE,
  quizId,
  completed,
  correct,
})

export const ADD_QUIZ = 'ADD_QUIZ';
export const addQuiz = quiz => ({
  type: ADD_QUIZ,
  quiz: quiz,
})


export const INCREMENT_ATTEMPT = 'INCREMENT_ATTEMPT';
export const incrementAttempt = (quizId, attempt) => ({
  type: INCREMENT_ATTEMPT,
  quizId: quizId,
  attempt: attempt,
})

// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@


export const login = (credentials) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const auth = `${credentials.username}:${credentials.password}`; // u & pw as string
  const headers = {
    "Authorization": "Basic " + btoa(auth), // base64 encryption
    "x-requested-with": "xhr"
  }; 
  const init = { 
    method: 'POST',
    headers
  };
  let fetchedUser;
  console.log('init', init);
  return fetch(url, init)    
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
    dispatch(updateUserStore(fetchedUser));
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
// @@@@@@@@@@  C R E A T E    U S E R  @@@@@@@@@@@@@@

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
    dispatch(updateUserStore(user));
  })
  .then(()=>{
    return dispatch(actionsMode.gotoLogin());
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}

// @@@@@@@@@@  U P D A T E     U S E R     P R O F I L E  @@@@@@@@@@@@@@
// username, password, firstName, lastName
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
    return dispatch(updateUserStore(user));
    // let user know profile is updated
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}

// @@@@@@@@@@  U P D A T E     N O N - P R O F I L E     D A T A  @@@@@@@@@@@@@@
// quizzes taken, badges, etc.
export const updateUserData = (userData, authToken) => dispatch => { 
  const url = `${REACT_APP_BASE_URL}/api/users/${userData.id}/data`;
  console.log('userData.id',userData.id)
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
    'Accept': 'application/json',
    "x-requested-with": "xhr"
  };
  const init = { 
    method: 'PUT',
    headers,
    body: JSON.stringify(userData) //user data should flow the exact format ofthe schema
  };
  console.log('init at update user data', init);
  return fetch(url, init)
  .then(res=>{          //response=user.apiRepr() with archived quizzes filtered out
    console.log(res);
    if (!res.ok) { 
      // return Promise.reject(res.statusText);
      return console.log('error', res);
    }
    return res.json();
  }) 
  .then(user => { 
    console.log('user returned from db',user);
    user.authToken = authToken;
    return dispatch(updateUserStore(user)); // archived quizzes not included
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}