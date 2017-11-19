import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsQuiz from './quiz';
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
    dispatch(updateUserStore(user));
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
    return dispatch(updateUserStore(user));
    // let user know profile is updated
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}

// update user non-profile data (quizzes taken, badges, etc.)
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

export const submitChoices = (quiz, nextIndex, mode, choices) => dispatch => { 
  // choices has this format { userId, quizId, attempt, questionId, choices (array), index, stickyIndex }
  const preScoreUpdate = {
    nextIndex: nextIndex,
    completed: quiz.completed + 1,
    correct: quiz.correct,
    pending: quiz.pending + 1
  };
  dispatch(actionsQuiz.nextQuestion(preScoreUpdate));
  
  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + user.authToken,
    "x-requested-with": "xhr"
  };
  const init = { 
    method: 'POST',
    headers,
    body: JSON.stringify(choices),
  };
  console.log('init for submitChoices', init);

  // POST CHOICE: SCORES, SAVES IN DB, RETURNS TRUE OR FALSE
  return fetch(url, init)
  .then(res => {
    console.log('choices fetched (this user, this quiz, this attempt',res);
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })

  // UPDATE COMPLETED & CORRECT THIS QUIZ
  .then(score => { // boolean
    const correct = score ? quiz.correct + 1 : quiz.correct ;
    const pending = quiz.pending > 0 ? quiz.pending - 1 : 0 ; 
    const postScoreUpdate = {
      quizPending: pending,
      quizCompleted: quiz.completed,
      quizCorrect: correct,
      questionCorrect: score,
      questionId: choices.questionId,
      choices: choices.choices,
      index: choices.index,
      stickyIndex: choices.stickyIndex, // currently not using, might in future
    };
    dispatch(actionsQuiz.scoreChoice(postScoreUpdate));
  })

  // ADVANCE TO SCORE IF AT END
  .then(()=> {
    if ( mode === 'results' ) { 
      console.log('choices.quizId', choices.quizId, 'attempt', choices.attempt);
      return dispatch(actionsMode.gotoResults());
    } 
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}