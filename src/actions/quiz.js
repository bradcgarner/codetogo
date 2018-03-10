// this is the single current quiz when new quiz selected

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsQuestions from './questions';
import * as actionsQuizList from './quizList';
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

export const UPDATE_QUIZ_INDEX_CURRENT = 'UPDATE_QUIZ_INDEX_CURRENT';
export const updateQuizIndexCurrent = indexCurrent => ({
  type: UPDATE_QUIZ_INDEX_CURRENT,
  indexCurrent,
});

export const TOGGLE_SHOW_ANSWERS = 'TOGGLE_SHOW_ANSWERS';
export const toggleShowAnswers = value => ({
  type: TOGGLE_SHOW_ANSWERS,
  showingAnswers: value,
});

// redundant of single quiz update, but this affects the list, so user sees updated score in the list as well
export const UPDATE_NEXT_STATE = 'UPDATE_NEXT_STATE';
export const updateNextState = nextState => ({
  type: UPDATE_NEXT_STATE,
  nextState, 
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
export const takeQuiz = (idQuiz, idUser, option, authToken) => dispatch => {
  // option = 'add' or 'take'.  In either instance, UI assumes user will take quiz right away.
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/quizzes/${idQuiz}/users/${idUser}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
  };
  const init = { 
    method: option === 'add' ? 'PUT' : 'GET',
    headers
  };
  // GET EVERYTING FOR THIS QUIZ FROM DATABASE, put b/c modifies user (via subcollection)
  return fetch(url, init)
    .then(quizReturned => {
      // console.log('quizReturned from server',quizReturned);
      if (!quizReturned.ok) {
        return Promise.reject(quizReturned.statusText);
      }
      return quizReturned.json(); 
    })
    .then(quizReturned=>{
      console.log('quizReturned',quizReturned)
      dispatch(loadQuiz(quizReturned.quiz));
      if(option === 'add') {
        dispatch(actionsQuizList.addQuiz(quizReturned.quiz));
      }
      dispatch(actionsQuestions.loadQuestions(quizReturned.questions));
      // console.log('questions should be loaded',quizReturned.questions)
      return dispatch(actionsDisplay.closeLoading());
    })
    .catch(err => {
      console.log(err);
      // const errJson = err.json();
      const error = typeof err === 'string' ? err :
      typeof err === 'object' && err.message ? err.message :
      // typeof errJson === 'object' && errJson.message ? errJson.message :
      'something went wrong';
      dispatch(actionsDisplay.showModal(error));
    });
};