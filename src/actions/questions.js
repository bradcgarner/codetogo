// questions for the current quiz
// single current question is store.questions[store.quiz.indexCurrent]

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
// import * as actionsUser from './user';
import * as actionsQuiz from './quiz';
// import * as actionsQuizList from './quizList';
import 'whatwg-fetch';


// load all questions when user loads a quiz
export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const loadQuestions = questions => ({
  type: LOAD_QUESTIONS,
  questions,
});

// update a single question in the array
// reducer uses default values if none passed, so we can pass only indexNext
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const updateQuestion = (index, indexNext, score) => ({
  type: UPDATE_QUESTION,
  index, 
  indexNext,
  score, 
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

export const answerQuestion = (answerObject, authToken) => dispatch => {
  dispatch(actionsDisplay.showLoading());
  
  const url = `${REACT_APP_BASE_URL}/api/questions/${answerObject.idQuestion}`;
  const headers = { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + authToken,
  };
  const init = { 
    method: 'PUT',
    headers,
    body: JSON.stringify(answerObject)
  };
  // GET ALL QUESTIONS FOR THIS QUIZ FROM DATABASE
  return fetch(url, init)
    .then(answerReturned => {
      if (!answerReturned.ok) {
        return Promise.reject(answerReturned.statusText);
      }
      return answerReturned.json();
    })
    .then(answerReturned=>{
      console.log('answerReturned from server',answerReturned);
      // nextState pauses update momentarily so user can see results, then updates on advance button
      dispatch(actionsQuiz.updateNextState(answerReturned));
      dispatch(actionsQuiz.toggleShowAnswers(true));
      return dispatch(actionsDisplay.closeLoading());
    })
    .catch(err => {
      const error = typeof err === 'string' ? err :
        typeof err === 'object' && err.message ? err.message :
        'something went wrong';
      dispatch(actionsDisplay.showModal(error));
    });
  };