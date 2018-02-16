// questions for the current quiz
// single current question is store.questions[store.quiz.indexCurrent]

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
import * as actionsQuiz from './quiz';
import * as actionsQuizList from './quizList';
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
export const updateQuestion = (index, indexNext, answers, correct, score) => ({
  type: UPDATE_QUESTION,
  index, 
  indexNext,
  answers,
  correct,
  score, 
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

export const answerQuestion = (answerObject, authToken) => dispatch => {
  // console.log('in answerQuestion questions', questions);
  // console.log('indexCurrent', indexCurrent, choices, 'choices', 'idUser', idUser);
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
  // console.log('answerQuestion init', init)
  // GET ALL QUESTIONS FOR THIS QUIZ FROM DATABASE
  return fetch(url, init)
    .then(answerReturned => {
      // console.log('answerReturned',answerReturned);
      if (!answerReturned.ok) {
        return Promise.reject(answerReturned.statusText);
      }
      return answerReturned.json();
    })
    .then(answerReturned=>{
      console.log('answerReturned',answerReturned);
      const {
        answers,
        correct,
        indexInsertBefore, // not used; FYI; this should match indexNextNew
        indexInsertAfter,
        indexRedirect, // this used to point at the current question, but now points to the question the current question used to point to
        scoreNew,
        indexNextNew,
        indexRedirectNext
      } = answerReturned;

      // console.log(' ')
      // console.log('update current index', answerObject.indexCurrent, 'next new', indexNextNew, 'answers', answers, 'correct', correct, 'scoreNew', scoreNew)
      dispatch(updateQuestion(answerObject.indexCurrent, indexNextNew, answers, correct, scoreNew));
      // console.log('update redirect', 'index', indexRedirect, 'next', indexRedirectNext)
      dispatch(updateQuestion(indexRedirect, indexRedirectNext));
      // console.log('update after', 'index', indexInsertAfter, 'next', answerObject.indexCurrent)
      dispatch(updateQuestion(indexInsertAfter, answerObject.indexCurrent));
      dispatch(actionsQuiz.updateQuizScore(answerObject.scorePrior, scoreNew));
      dispatch(actionsQuizList.updateQuizListScore(answerObject.idQuiz, answerObject.scorePrior, scoreNew));
      return dispatch(actionsDisplay.closeLoading());

    })
    .catch(err => {
      const error = typeof err === 'string' ? err :
        typeof err === 'object' && err.message ? err.message :
        'something went wrong';
      dispatch(actionsDisplay.showModal(error));
    });
  };