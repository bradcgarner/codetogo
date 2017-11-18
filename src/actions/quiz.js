import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsUser from './users';
import 'whatwg-fetch';
const deepAssign = require('deep-assign');

// NOTE: Quiz is for quizzes and questions. CHOICES GO IN USERS.

// export const QUESTIONS = 'QUESTIONS';
// export const questions = questions => ({
//   type: QUESTIONS,
//   questions
// });

export const TOGGLE_FORM_STATUS = 'TOGGLE_FORM_STATUS';
export const toggleFormStatus = status => ({
  type: TOGGLE_FORM_STATUS,
  formIsEmpty: status,    
})

// this is the single current quiz when new quiz selected
export const LOAD_QUIZ = 'LOAD_QUIZ';
export const loadQuiz = quiz => ({
  type: LOAD_QUIZ,
  id: quiz.id,    
  name: quiz.name,
  category: quiz.category,
  difficulty: quiz.difficulty,
  questions: quiz.questions,
  originalLength: quiz.originalLength,
  attempt: quiz.attempt,
  currentIndex: quiz.nextIndex,
  completed: quiz.completed,
  correct: quiz.correct 
});

// this is the single current quiz
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = quiz => ({
  type: NEXT_QUESTION,
  currentIndex: quiz.nextIndex,
  completed: quiz.completed,
  correct: quiz.correct
});

// only used for skipping, not when submitting choices
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const updateCurrentQuestion = nextIndex => ({
  type: UPDATE_CURRENT_QUESTION,
  currentIndex: nextIndex,
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
export const updateQuizMenu = menu => ({
  type: UPDATE_QUIZ_MENU,
  menuOfAllQuizzes: menu
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

export const calcAttemptNum = (quizId, theUser) => {
  let  attempt = 0;
  const priorAttempts = theUser.quizzes.filter(quiz=>quiz.id === quizId); // user should already be deepAssign();
  const priorAttempt = priorAttempts[priorAttempts.length-1];
  if ( priorAttempt ) {
    if ( priorAttempt.completed >= priorAttempt.originalLength ) {
      attempt = priorAttempt.attempt + 1;
    } else {
    attempt = priorAttempt.attempt || 0;    
    }
  }  
   return attempt;
}

// take (or add) quiz
export const takeOrAddQuiz = (quiz, user, next, mode) => dispatch => {
  const authToken = user.authToken;
  const quizId = quiz.id; 
  const userId = user.id; 
  let attempt = 0;
  // next parameter may equal take, but may require add first
  // determine that here; and use the 'add' as a req.param
  let prior = user.quizzes.find(quiz=>quiz.quizId === quizId);
  let add = !prior ? 'add' : 'take' ;

  // attempts are incremented here and only here
  // this requires the local user to have an accurate completed #
  // local user gets completed # as follows: 
      // on load of each quiz reading from choices in db
      // on each choice submitted, saved locally (choices saved in db)
  // the two steps above leave one loophole:
      // Quiz A has 1 answered, 1 correct at login
      // user advances to 3 answered, 2 correct
      // choices are in db
      // scorecard is correct locally
      // scorecard in db is NOT updated !!!!!
  // to address that, each time user takes a quiz, the user.lastSession gets the quizId in the db
  // next log in, the lastSession quizzes are scored from scratch reading choices in the db (versus all quizzes rescored, which would have a high big O)
  // user is loaded from db, after that scoring, at login
  if ( add === 'add') {
    dispatch(actionsUser.addQuiz(quizId, userId));
  } else {
    attempt = calcAttemptNum(quiz, user);    
  }
  const url = `${REACT_APP_BASE_URL}/api/quizzes/${quizId}/users/${userId}/${add}/${attempt}/${next}`;
  const headers = { "Content-Type": "application/json", "x-requested-with": "xhr" };
  const init = { 
    method: 'PUT',
    headers
  };
  // GET EVERYTING FOR THIS QUIZ FROM DATABASE. (take and add are diff endpoints)
  // using put because we potentially modify user
  return fetch(url, init)
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    // UPDATE STORE
    .then(res=>{
      if (add === 'add' ) {
        dispatch(actionsUser.addQuiz(res.quiz, userId));
      }
      if (next === 'take' ) {
        dispatch(loadQuiz(res.quiz));
        return dispatch(actionsMode.gotoQuestion());  
      } else {
        return;
      }    
    })
    .catch(error => {
      dispatch(actionsMode.showModal(error));
    });
};
