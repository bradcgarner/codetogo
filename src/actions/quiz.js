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

export const UPDATE_QUIZ_SCORE_AND_INDEX = 'UPDATE_QUIZ_SCORE_AND_INDEX';
export const updateQuizScoreAndIndex = (score, indexCurrent) => ({
  type: UPDATE_QUIZ_SCORE_AND_INDEX,
  score,
  indexCurrent,
});


// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes; only once at load
export const  fetchQuizzes = () => dispatch => { 
  return fetch(`${REACT_APP_BASE_URL}/api/quizzes/`)
    .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
    })
    .then(quizzes => {
      return dispatch(updateQuizMenu(quizzes));
    })
    .catch(error => {
      dispatch(actionsMode.showModal(error));        
    });
};

// ~~~~~~~~~~~~ HELPERS TO TAKE QUIZ ~~~~~~~~~~~~

// take quiz
export const takeQuiz = (quiz, user, option, mode) => dispatch => {
  //const attempt = quiz.attempt;
  console.log('take quiz option', option, quiz);
  console.log('user before update', user);
  let updatedUser = deepAssign({},user);
  const authToken = user.authToken;
  const quizId = quiz.id;  
  let thisQuiz = deepAssign({},quiz);
  let fetchedQuestions = [];
  let filterQuestions = false;
  let originalLength;
  let updatedQuiz = {};

  // CALCULATE THE QUIZ SETTINGS: 
  // 1) ATTEMPT, 2) RESET CORRECT, 3) FILTER COMPLETED QUESTIONS
  if ( option !== 'add' ) {
    thisQuiz = calculateQuizSettings(thisQuiz, updatedUser);
    filterQuestions = thisQuiz.filterQuestions;
    delete thisQuiz.filterQuestions;    
    console.log('take quiz (not add), filterQuestions tf', filterQuestions);
    console.log('thisQuiz at end of take (not add)', thisQuiz); 
  }

  // add quiz to updated user if needed
  updatedUser.quizzes = updateUserQuizList(updatedUser, thisQuiz); // thisQuiz.attempt should be the current attempt
  console.log('updatedUser', updatedUser);
  

  // IF ONLY ADD, UPDATE USER STORE, AND END
  if ( option === 'add' ) {
    console.log('adding quiz, updatedUser', updatedUser);
    return dispatch(actionsUser.updateUserData(updatedUser, authToken));    
  }

  // GET ALL QUESTIONS FOR THIS QUIZ FROM DATABASE
  return fetch(`${REACT_APP_BASE_URL}/api/quizzes/${quizId}/questions`)
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })

    // FILTER OUT COMPLETED QUESTIONS IF NEEDED
    .then(questions => {
      console.log('questions returned', questions);
      originalLength = questions.length;
      console.log('originalLength',originalLength);
      if (filterQuestions  === true) {
        const choiceObject = {};
        console.log('attempt to fetch', thisQuiz.attempt);
        return fetch(`${REACT_APP_BASE_URL}/api/choices/quizzes/${quizId}/users/${user.id}/${thisQuiz.attempt}`)
          .then(res => {
            if (!res.ok) {
              return Promise.reject(res.statusText);
            }
            return res.json();
          })
          .then(choices=>{
            console.log('choices fetched to use for filter',choices);
            choices.forEach(choice=>{
              choiceObject[choice.questionId] = true;
            });
            fetchedQuestions = questions.filter(question=>choiceObject[question.id] !== true);
            console.log('fetchedQuestions after filter', fetchedQuestions);
          })
      } else {
        fetchedQuestions = questions;
      } // end if
      return;
    }) // end then

    // UPDATE STORE
    .then(()=>{
      console.log('fetchedQuestions inside then', fetchedQuestions);
      updatedQuiz = deepAssign({}, thisQuiz, {
        questions: fetchedQuestions,
        currentIndex: 0,  // always start at 0, which might be start of a filtered array
        originalLength
      });
      console.log('update quiz store', updatedQuiz);
      return dispatch(loadQuiz(updatedQuiz)); // updates state.quiz, but not state.quiz.questions
    })
    .then(()=>{
      return dispatch(actionsUser.updateUserData(updatedUser, authToken)); // async
    })
    .then(()=>{
      return dispatch(actionsMode.gotoQuestion());      
    })
    .catch(error => {
      dispatch(actionsMode.showModal(error));
    });
  };