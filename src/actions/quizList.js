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

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@