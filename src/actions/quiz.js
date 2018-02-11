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
export const updateQuizScore = (scorePrior, scoreNew) => ({
  type: UPDATE_QUIZ_SCORE,
  scorePrior,
  scoreNew,
});

export const UPDATE_QUIZ_INDEX_CURRENT = 'UPDATE_QUIZ_INDEX_CURRENT';
export const updateQuizIndexCurrent = indexCurrent => ({
  type: UPDATE_QUIZ_INDEX_CURRENT,
  indexCurrent,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes; only once at load
export const  getQuiz = idQuiz => dispatch => { 
  
  dispatch(actionsDisplay.showLoading());
  
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
  
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/quizzes/${idQuiz}/users/${idUser}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
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
        return dispatch(actionsDisplay.closeLoading());
    })
    .catch(error => {
      dispatch(actionsDisplay.closeLoading());
      dispatch(actionsDisplay.showModal(error));
    });
};