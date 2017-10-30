import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsQuiz from './quiz';
const deepAssign = require('deep-assign');


export const UPDATE_USER_STORE = 'UPDATE_USER_STORE';
export const updateUserStore = user => {
  return deepAssign({}, user, {  type: UPDATE_USER_STORE } )
}

// export const TEMP_USER = 'TEMP_USER';
// export const tempUser = user => {
//   return {
//     username: user.username,
//     type: TEMP_USER }
// }


// @@@@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@@@


export const login = (credentials) => dispatch => {
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const auth = `${credentials.username}:${credentials.password}`; // u & pw as string
  const headers = {"Authorization": "Basic " + btoa(auth)}; // base64 encryption
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
  .then(()=>{
    return dispatch(actionsQuiz.fetchQuizzes());     
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
   // dispatch(loginError(error));
    console.log(error);
  });
    
  
}
// create new user
export const createUser = (credentials) => dispatch => { //credential should include   username, password, firstName, lastName  
  const url = `${REACT_APP_BASE_URL}/api/users`;
  const headers = { "Content-Type": "application/json"};
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
    dispatch(updateUserStore(user));
  })
  .then(()=>{
    return dispatch(actionsMode.gotoLogin());
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}

//update user core profile: username, password, firstName, lastName
export const updateUserProfile = (credentials, authToken) => dispatch => { //credentials MAY include username, password, firstName, lastName
  const url = `${REACT_APP_BASE_URL}/api/users/${credentials.id}`;
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + authToken};
  const init = { 
    method: 'PUT',
    body: credentials,
    headers
  };
  console.log('init', init);
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
   // dispatch(loginError(error));
    console.log(error);
  });
}

// update user non-profile data (quizzes taken, badges, etc.)
export const updateUserData = (userData, authToken) => dispatch => { 
  const url = `${REACT_APP_BASE_URL}/api/users/${userData.id}/data`;
  console.log('userData.id',userData.id)
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
    'Accept': 'application/json'
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
  // dispatch(loginError(error));
    console.log(error);
  });
}

// ~~~~~~~~~~~~~~ HELPERS FOR SUBMIT CHOICES ~~~~~~~~~~~~~~

export const calcCompletedAndCorrect = (choices) => {
  console.log('all Quiz Choices ', choices); 
  const completed = choices.length;
  console.log('completed',completed); 
  const choicesCorrect = choices.filter(choice => choice.correct === true );
  console.log('choicesCorrect',choicesCorrect); 
  const correct = choicesCorrect.length;
  console.log('correct',correct); 
  return { correct, completed };
}

export const submitChoices = (choices, user, nextIndex, mode) => dispatch => { 
  const updatedUser = deepAssign({}, user );
  let quizForStore;
  console.log('nextIndex, mode, choice as received by submitChoices',nextIndex, mode, choices)
  const quizIndexToUpdate = user.quizzes.findIndex(quiz=>quiz.id === choices.quizId);
  console.log('user.quizzes quizIndexToUpdate', quizIndexToUpdate, user.quizzes);
  console.log('quiz to update', user.quizzes[quizIndexToUpdate]);
  if (quizIndexToUpdate < 0 ) {return console.log('cannot updated quiz index of ', quizIndexToUpdate);}

  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  const headers = { "Content-Type": "application/json", "Authorization": "Bearer " + user.authToken};
  const init = { 
    method: 'POST',
    headers,
    body: JSON.stringify(choices),
  };
  console.log('init for submitChoices', init);

  // POST CHOICE: SCORES, SAVES IN DB, RETURNS ALL CHOICES THIS QUIZ, THIS ATTEMPT
  return fetch(url, init)
  .then(res => {
    console.log('choices fetched (this user, this quiz, this attempt',res);
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })

  // UPDATE COMPLETED & CORRECT THIS QUIZ
  .then(allQuizChoices => { // this is to update state.user.quizzes[].completed
    const score = calcCompletedAndCorrect(allQuizChoices);
    updatedUser.quizzes[quizIndexToUpdate].completed = score.completed;
    updatedUser.quizzes[quizIndexToUpdate].correct = score.correct;
    
    console.log('updatedUser after updating completed & correct',updatedUser);
    console.log('updatedUser.quizzes[quizIndexToUpdate]',quizIndexToUpdate, updatedUser.quizzes[quizIndexToUpdate]);

    // UPDATE USER IN DB (ASYNC) AND IN STORE    
    return dispatch(updateUserData(updatedUser, user.authToken));
  })

  // UPDATE QUIZ STORE
  .then(()=>{
    quizForStore = deepAssign({}, updatedUser.quizzes[quizIndexToUpdate], {nextIndex});
    console.log('quizForStore',quizForStore);
    return dispatch(actionsQuiz.nextQuestion(quizForStore));
  })

  // ADVANCE TO SCORE IF AT END
  .then(()=> {
    console.log('quizForStore',quizForStore);
    if ( mode === 'results' ) { 
      console.log('choices.quizId', choices.quizId, 'user', user, 'attempt', choices.attempt);
      return dispatch(actionsMode.gotoResults());
    } 
  })
  .catch(error => {
   // dispatch(loginError(error));
    console.log(error);
  });
}