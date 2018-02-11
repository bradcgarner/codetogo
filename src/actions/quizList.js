// quizList is the list of the users quizzes

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
import * as actionsUser from './user';
import 'whatwg-fetch';

export const LOAD_QUIZ_LIST = 'LOAD_QUIZ_LIST';
export const loadQuizList = quizList => ({
  type: LOAD_QUIZ_LIST,
  quizList,    
});

export const ADD_QUIZ = 'ADD_QUIZ';
export const addQuiz = quiz => ({
  type: ADD_QUIZ,
  quiz,    
});

// redundant of single quiz update, but this affects the list, so user sees updated score in the list as well
export const UPDATE_QUIZLIST_SCORE = 'UPDATE_QUIZLIST_SCORE';
export const updateQuizListScore = (idQuiz, scorePrior, scoreNew) => ({
  type: UPDATE_QUIZLIST_SCORE,
  idQuiz,
  scorePrior, 
  scoreNew, 
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@