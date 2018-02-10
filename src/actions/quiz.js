// this is the single current quiz when new quiz selected

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
import 'whatwg-fetch';

export const LOAD_QUIZ = 'LOAD_QUIZ';
export const loadQuiz = quiz => ({
  type: LOAD_QUIZ,
  quiz
});

export const UPDATE_QUIZ_SCORE = 'UPDATE_QUIZ_SCORE';
export const updateQuizScore = score => ({
  type: UPDATE_QUIZ_SCORE,
  score,
});

export const UPDATE_QUIZ_INDEX = 'UPDATE_QUIZ_INDEX';
export const updateQuizIndex = indexCurrent => ({
  type: UPDATE_QUIZ_INDEX,
  indexCurrent,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes; only once at load
export const  getQuiz = idQuiz => dispatch => { 
  return fetch(`${REACT_APP_BASE_URL}/api/quizzes/${idQuiz}`)
    .then(quizFound => {
        if (!quizFound.ok) {
          return Promise.reject(quizFound.statusText);
        }
        return quizFound.json();
    })
    .then(quizFound => {
      return dispatch(loadQuiz(quizFound));
    })
    .catch(error => {
      dispatch(actionsDisplay.showModal(error));        
    });
};

// ~~~~~~~~~~~~ HELPERS TO TAKE QUIZ ~~~~~~~~~~~~

// take quiz
export const takeQuiz = (idQuiz, idUser, authToken) => dispatch => {
  
  const url = `${REACT_APP_BASE_URL}/api/quizzes/${idQuiz}/users/${idUser}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
    "x-requested-with": "xhr"
  };
  const init = { 
    method: 'PUT',
    headers
  };
  // GET EVERYTING FOR THIS QUIZ FROM DATABASE, put b/c potentially modify user
  return fetch(url, init)
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }

      return res.json(); 
    })
    .then(res=>{
   
        dispatch(loadQuiz(res.quiz));
     
    })
    .catch(error => {
      dispatch(actionsDisplay.showModal(error));
    });
};

// @@@@@@@@@@  S U B M I T     C H O I C E S    @@@@@@@@@@@@@@

export const submitChoices = (user, quiz, nextIndex, mode, choices) => dispatch => { 
  // choices has this format { userId, quizId, attempt, questionId, choices (array), index, stickyIndex }

  
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



  .catch(error => {
    dispatch(actionsDisplay.showModal(error));
  });
}