import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsUser from './users';
const deepAssign = require('deep-assign');

// NOTE: Quiz is for quizzes and questions
// CHOICES GO IN USERS !!!

export const QUESTIONS = 'QUESTIONS';
export const questions = (questions) => ({
  type: QUESTIONS,
  questions
});

export const TOGGLE_FORM_STATUS = 'TOGGLE_FORM_STATUS';
export const toggleFormStatus = (status) => ({
  type: TOGGLE_FORM_STATUS,
  formIsEmpty: status,    
})

// this is the single current quiz
export const UPDATE_QUIZ_STORE = 'UPDATE_QUIZ_STORE';
export const updateQuizStore = (quiz) => ({
  type: UPDATE_QUIZ_STORE,
  id: quiz.id,    
  name: quiz.name,
  category: quiz.category,
  difficulty: quiz.difficulty,
  questions: quiz.questions,
  originalLength: quiz.originalLength,
  attempt: quiz.attempt,
  currentIndex: quiz.nextIndex,
  completed: quiz.completed,
  correct: quiz.correct,
  total: quiz.questions.length,
  formIsEmpty: true,  
});

// this is the single current quiz
export const INCREMENT_QUIZ_STORE = 'INCREMENT_QUIZ_STORE';
export const incrementQuizStore = (quiz) => ({
  type: INCREMENT_QUIZ_STORE,
  currentIndex: quiz.nextIndex,
  completed: quiz.completed,
  correct: quiz.correct,
  formIsEmpty: true,  
});

// only used for skipping, not when submitting choices
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const updateCurrentQuestion = (nextIndex) => ({
  type: UPDATE_CURRENT_QUESTION,
  currentIndex: nextIndex,
  formIsEmpty: true,  
});

// update current quiz with score for 1 question
export const SCORE_CHOICE = 'SCORE_CHOICE';
export const scoreChoice = correct => ({
  type: SCORE_CHOICE,
  questionId: correct.questionId,
  correct: correct.correct,
  choices: correct.choices
});

export const UPDATE_QUIZ_MENU = 'UPDATE_QUIZ_MENU';
export const updateQuizMenu = (menu) => ({
  type: UPDATE_QUIZ_MENU,
  menuOfAllQuizzes: menu
});


// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@

// get list of all quizzes
export const  fetchQuizzes = () => dispatch => {
  console.log("fetches quizzes async action");
  return fetch(`${REACT_APP_BASE_URL}/api/quizzes/`)
      .then(res => {
        console.log('quizzes fetched',res);
          if (!res.ok) {
              return Promise.reject(res.statusText);
          }
          return res.json();
      })
      .then(quizzes => {
        console.log('quizzes fetched',quizzes);
          dispatch(updateQuizMenu(quizzes));
          return dispatch(actionsMode.gotoQuizlist());
      })
      .catch(error => {
       // dispatch(fetchError(error));
        console.log(error);
      });
};

// take (or add) quiz
export const takeQuiz = (quiz, user, option) => dispatch => {
  //const attempt = quiz.attempt;
  console.log('take quiz option', option, quiz);
  console.log('user', user);
  let updatedUser = deepAssign({},user);
  let updatedQuizList;
  const authToken = user.authToken;
  const quizId = quiz.id;  
  let thisQuiz = deepAssign({},quiz);
  thisQuiz.attempt = 0; // default value
  let fetchedQuestions = [];
  let filterQuestions = false;
  let originalLength;
  let updatedQuiz = {};
  let quizIsListed = false;

  // CALCULATE THE QUIZ SETTINGS: 
  // 1) ATTEMPT, 2) RESET CORRECT, 3) FILTER COMPLETED QUESTIONS
  if ( option !== 'add' ) {
    const priorAttempts = updatedUser.quizzes.filter(quiz=>quiz.id === quizId); // user should already be deepAssign();
    const priorAttemptPointer = priorAttempts[priorAttempts.length-1];
    const priorAttempt = deepAssign({}, priorAttemptPointer);
    console.log('priorAttempt, #', priorAttempts.length, priorAttempt)
    if ( !priorAttempt ) {
      console.log('priorAttempt (false)', priorAttempt);
    } else if (!priorAttempt.completed) {
      console.log('priorAttempt.completed (false)', priorAttempt.completed);
    } else if ( priorAttempt.completed > 0 && priorAttempt.completed < priorAttempt.total ) {
      filterQuestions = true;
      console.log('partial, filter', priorAttempt, filterQuestions);
    } else if ( priorAttempts.length > 0 ) {
      thisQuiz.attempt = priorAttempt.attempt + 1;
      thisQuiz.correct = 0;
      thisQuiz.completed = 0;
      console.log('restart thisQuiz', thisQuiz);
    }
    console.log('thisQuiz @ end of settings', thisQuiz);
  }

  // ADD QUIZ TO UPDATED USER IF NEEDED
  updatedUser.quizzes.forEach(exQuiz=>{
    if (exQuiz.id === quizId) {
      exQuiz.id = thisQuiz.attempt; // increment attempt of quiz
      quizIsListed = true;
      console.log('quizisListed, quizId', quizIsListed, quizId);
      console.log('quizisListed, exQuiz', exQuiz, quizId);
    }
  });
  console.log('updatedUser b4, quizId',quizId, updatedUser);
  console.log('quizislisted',quizIsListed);
  if (quizIsListed) {
    updatedQuizList = [...updatedUser.quizzes];
    console.log('NOT ADDING QUIZ !!',updatedQuizList)
  } else {
    updatedQuizList= [...updatedUser.quizzes, thisQuiz];
    console.log('updatedUser with quiz ADDED', updatedUser);
  } 
  updatedUser.quizzes = updatedQuizList;
  console.log('updatedUser with quiz ADDED', updatedUser);
  console.log('updatedQuizList', updatedQuizList);
  
  
  // && quizIsListed[0].hasOwnProperty('id')


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


    // FILTER QUESTIONS IF NEEDED
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
            console.log('choiceObject', choiceObject);
            console.log('questions still available?', questions);
            fetchedQuestions = questions.filter(question=>choiceObject[question.id] !== true);
            console.log('fetchedQuestions', fetchedQuestions);
            
          })
      } else {
        fetchedQuestions = questions;
      } // end if
      return;
    }) // end then



    // UPDATE SINGLE QUIZ FOR THE STORE
    .then(()=>{
      console.log('fetchedQuestions inside then', fetchedQuestions);
      updatedQuiz = deepAssign({}, thisQuiz, {
        questions: fetchedQuestions,
        currentIndex: 0,  // always start at 0, which might be start of a filtered array
        originalLength
      });
      console.log('updatedQuiz', updatedQuiz);
      return updatedQuiz;
    })


    // UPDATE THE QUIZ STORE, THEN USER STORE - SYNC, THEN ASYNC
    .then(()=>{
      dispatch(updateQuizStore(updatedQuiz)); // updates state.quiz, but not state.quiz.questions
      // ASYNC
      return dispatch(actionsUser.updateUserData(updatedUser, authToken));
    })
    // CHANGE VIEW MODE LAST
    .then(()=>{
      return dispatch(actionsMode.gotoQuestion());      
    })
    .catch(error => {
      // dispatch(fetchError(error));
      console.log(error);
    });
  };