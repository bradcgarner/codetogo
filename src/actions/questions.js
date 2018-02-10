// questions for the current quiz
// single current question is store.questions[store.quiz.indexCurrent]

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
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
export const updateQuestion = (index, answers, score, indexNext) => ({
  type: UPDATE_QUESTION,
  index, 
  answers,
  score, 
  indexNext
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@


// ~~~~~~~~~~~~ HELPERS TO TAKE QUIZ ~~~~~~~~~~~~



// take (or add) quiz
export const answerQuestion = (answer, authToken) => dispatch => {



  // GET ALL QUESTIONS FOR THIS QUIZ FROM DATABASE
  return fetch(`${REACT_APP_BASE_URL}/api/questions/${'idQuestion'}/questions`)
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })

    
    .then(()=>{
      return dispatch(actionsUser.updateUser('updatedUser', authToken)); // async
    })

    .catch(error => {
      dispatch(actionsDisplay.showModal(error));
    });
  };