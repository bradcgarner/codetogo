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

const calcScore = (scorePrior, correct) => {
  const score = (typeof scorePrior === 'number' && scorePrior >=2) ? scorePrior : 2 ;
  const changeFactor = correct ? Math.ceil(Math.sqrt(scorePrior)) : Math.ceil(scorePrior/2) ;
  if(correct) return Math.ceil(score + changeFactor);
  return changeFactor;
};

const calcPositions = (length, score, correct) => {
  if(score < 2) return 2;
  const variantLo = Math.floor(Math.random() * 3);
  const variantHi = Math.ceil(length * 0.1);
  const randomAdder = correct ?
    Math.ceil(Math.random() * variantHi) : 
    Math.ceil(Math.random() * variantLo) ;
  const maxPositions = length - randomAdder - 1;
  if(!correct && score > length/2) return Math.ceil(length/2) + variantLo;
  if(!correct) return score + variantLo;
  if(score > maxPositions) return maxPositions;
  return score;
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
  // console.log('in answerQuestion questions', questions);
  // console.log('indexCurrent', indexCurrent, choices, 'choices', 'idUser', idUser);
  dispatch(actionsDisplay.showLoading());
  
  const idQuestion = questions[indexCurrent].id;
  const idQuiz = questions[indexCurrent].idQuiz;
  const scorePrior = questions[indexCurrent].score;
  console.log('scorePrior',scorePrior)
  const scoreIfTrue  = calcScore(questions[indexCurrent].score, true);  
  console.log('scoreIfTrue',scoreIfTrue)
  const positionsIfTrue  = calcPositions(questions.length, scoreIfTrue,  true);
  console.log('positionsIfTrue',positionsIfTrue)
  const indexInsertAfterIfTrue  = findIndex(questions, indexCurrent, positionsIfTrue);
  console.log('indexInsertAfterIfTrue',indexInsertAfterIfTrue)
  
  const scoreIfFalse = calcScore(questions[indexCurrent].score, false);
  console.log('scoreIfFalse',scoreIfFalse)
  const positionsIfFalse = calcPositions(questions.length, scoreIfFalse, false);
  console.log('positionsIfFalse',positionsIfFalse)
  const indexInsertAfterIfFalse = findIndex(questions, indexCurrent, positionsIfFalse);
  console.log('indexInsertAfterIfFalse',indexInsertAfterIfFalse)

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
  // console.log('request', request)

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
      // console.log('answerReturned',answerReturned);
      if (!answerReturned.ok) {
        return Promise.reject(answerReturned.statusText);
      }
      return answerReturned.json();
    })
    .then(answerReturned=>{
      // console.log('answerReturned',answerReturned);
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
    .catch(err => {
      const error = typeof err === 'string' ? err :
        typeof err === 'object' && err.message ? err.message :
        'something went wrong';
      dispatch(actionsDisplay.showModal(error));
    });
  };