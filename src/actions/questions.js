// questions for the current quiz
// single current question is store.questions[store.quiz.indexCurrent]

import { REACT_APP_BASE_URL } from '../config';
import * as actionsDisplay from './display';
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

// calculate attemp, correct, completed, filter true or false
export const calculateQuizSettings = (theQuiz, theUser) => {
  const quizId = theQuiz.id;  
  const priorAttempts = theUser.quizzes.filter(quiz=>quiz.id === quizId); // user should already be deepAssign();
  const priorAttemptPointer = priorAttempts[priorAttempts.length-1];
  const priorAttempt = deepAssign({}, priorAttemptPointer);
  console.log('priorAttempt, #', priorAttempts.length, priorAttempt)
  if ( !priorAttempt ) {
    theQuiz.attempt = 0;
    theQuiz.correct = 0;
    theQuiz.completed = 0;
    console.log('priorAttempt (false)', priorAttempt);
  } else if (!priorAttempt.completed) {
    theQuiz.attempt = theQuiz.attempt || priorAttempt.attempt || 0;
    console.log('priorAttempt.completed (false)', priorAttempt.completed);
  } else if ( priorAttempt.completed > 0 && priorAttempt.completed < priorAttempt.total ) {
    theQuiz.filterQuestions = true;
    theQuiz.attempt = theQuiz.attempt || priorAttempt.attempt || 0;    
    console.log('partial, filter', priorAttempt, theQuiz.filterQuestions);
  } else if ( priorAttempts.length > 0 ) {
    theQuiz.attempt = priorAttempt.attempt + 1;
    theQuiz.correct = 0;
    theQuiz.completed = 0;
    console.log('restart theQuiz', theQuiz);
  }
  console.log('theQuiz @ end of settings', theQuiz);
   return theQuiz
}

const updateUserQuizList = (user, theQuiz) => { // theQuiz.attempt should be the current attempt
  const quizId = theQuiz.id;  
  let quizIsListed = false;
  let quizzes;
  user.quizzes.forEach(exQuiz=>{
    if (exQuiz.id === quizId) {
      exQuiz.attempt = theQuiz.attempt;
      exQuiz.correct = theQuiz.correct; // needed for reset, problem elsewhere?
      exQuiz.completed = theQuiz.completed; // needed for reset
      quizIsListed = true;
      console.log('quizisListed, quizId', quizIsListed, quizId, exQuiz);
    }
  });
  console.log('user b4, quizId, quizIsListed',quizId, quizIsListed, user);
  if (quizIsListed) {
    quizzes = [...user.quizzes];
    console.log('NOT ADDING QUIZ !!')
  } else {
    quizzes = [...user.quizzes, theQuiz];
    console.log('ADDING', user);
  } 
  console.log('updatedQuizList', quizzes);
  return quizzes;
} 

// take (or add) quiz
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