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

// ~~~~~~~~~~~~ HELPERS  ~~~~~~~~~~~~

const calcScore = (scorePrior, correct, multIfTrue = 2, multIfFalse = 0.5) => {
  const score = typeof scorePrior === 'number' ? scorePrior : 2 ;
  if (correct) return Math.floor(score * multIfTrue);
  return Math.ceil(score * multIfFalse);
};

const calcPositions = (length, score, correct) => {
  if(!correct && score < length - 1) return score;
  if(!correct) return length - 1;
  const pct = !correct ? 0 : Math.ceil(length * 0.1);
  const randomAdder = Math.floor(Math.random() * pct);
  const rawPositions = score + randomAdder;
  if(rawPositions < length - 1) return rawPositions;
  return length - 1;
};

const findIndex = (questions, indexCurrent, positions) => {
  let indexNext;
  for (let i=0; i < positions; i++) {
    indexNext = questions[indexCurrent].indexNext
  }
  if (indexNext <= 1) return 2;
  return indexNext;
};

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

export const answerQuestion = (questions, indexCurrent, choices, idUser, authToken) => dispatch => {

  dispatch(actionsDisplay.showLoading());
  
  const idQuestion = questions[indexCurrent].id;
  const idQuiz = questions[indexCurrent].idQuiz;
  const scorePrior = questions[indexCurrent].score;
  const scoreIfTrue  = calcScore(questions[indexCurrent].score, true);
  const scoreIfFalse = calcScore(questions[indexCurrent].score, false);
  
  const positionsIfTrue  = calcPositions(questions.length, scoreIfTrue,  true);
  const positionsIfFalse = calcPositions(questions.length, scoreIfFalse, false);

  const indexInsertAfterIfTrue  = findIndex(questions, indexCurrent, positionsIfTrue);
  const indexInsertAfterIfFalse = findIndex(questions, indexCurrent, positionsIfFalse);

  const indexInsertBeforeIfTrue  = questions[indexInsertAfterIfTrue].indexNext;
  const indexInsertBeforeIfFalse = questions[indexInsertAfterIfFalse].indexNext;

  const request = {
    idQuestion,
    idUser,
    idQuiz,
    choices,
    scoreIfTrue,
    scoreIfFalse,
    indexCurrent,
    scorePrior: questions[indexCurrent].score,
    indexNextPrior: questions[indexCurrent].indexNext,
    indexInsertAfterIfTrue,
    indexInsertAfterIfFalse,
    indexInsertBeforeIfTrue,
    indexInsertBeforeIfFalse
  };

  const url = `${REACT_APP_BASE_URL}/api/questions/${idQuestion}`;
  const headers = { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + authToken,
  };
  const init = { 
    method: 'PUT',
    headers,
    body: JSON.stringify(request)
  };

  // GET ALL QUESTIONS FOR THIS QUIZ FROM DATABASE
  return fetch(url, init)
    .then(answerReturned => {
      console.log(answerReturned);
      if (!answerReturned.ok) {
        return Promise.reject(answerReturned.statusText);
      }
      return answerReturned.json();
    })
    .then(answerReturned=>{
      const {
        answers,
        correct,
        indexInsertBefore, // not used; FYI; this should match indexNextNew
        indexInsertAfter,
        indexRedirect, // this used to point at the current question, but now points to the question the current question used to point to
        scoreNew,
        indexNextNew,
        indexInsertAfterNext,
        indexRedirectNext
      } = answerReturned;

      dispatch(updateQuestion(indexCurrent, indexNextNew, answers, correct, scoreNew));
      dispatch(updateQuestion(indexRedirect, indexRedirectNext));
      dispatch(updateQuestion(indexInsertAfter, indexInsertAfterNext));
      dispatch(actionsQuiz.updateQuizScore(scorePrior, scoreNew));
      dispatch(actionsQuizList.updateQuizListScore(idQuiz, scorePrior, scoreNew));
      return dispatch(actionsDisplay.closeLoading());

    })
    .catch(error => {
      dispatch(actionsDisplay.closeLoading());
      dispatch(actionsDisplay.showModal(error));
    });
  };