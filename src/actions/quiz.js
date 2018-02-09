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

export const CLEAR_USER_CACHE = 'CLEAR_USER_CACHE';
export const clearUserCache = menu => ({
  type: CLEAR_USER_CACHE,
  cacheCorrect: null,
  cacheCompleted: null,
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
  const userId = user.id; 
  let attempt = 1;
  // whereas 'next' is used by client, 'add' is used by server; i.e. 'want to add?'
  let prior = user.quizzes.find(quiz=>quiz.id === quizId);
  console.log('prior', prior);
  let add = !prior ? 'add' : 'take' ;
  console.log('next', next, 'add', add);


  if ( add === 'add') {
    let quizToAdd = Object.assign({}, quiz,
      { attempt: attempt,
        completed: 0,
        correct: 0,
      }
    );
    dispatch(actionsUser.addQuiz(quizToAdd));
  } else {
    let priorAttempt = attempt;
    attempt = calcAttemptNum(quizId, user); 
    if (priorAttempt !== attempt) {
      dispatch(actionsUser.incrementAttempt(quiz.id, attempt));      
    }   
  }
  const url = `${REACT_APP_BASE_URL}/api/quizzes/${quizId}/users/${userId}/${add}/${attempt}/${next}`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + authToken,
    "x-requested-with": "xhr"
  };
  const init = { 
    method: 'PUT',
    headers
  };
  // GET EVERYTING FOR THIS QUIZ FROM DATABASE, put b/c potentially modify user
  return fetch(url, init)
    .then(res => {
      console.log(res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }

      return res.json(); 
    })
    .then(res=>{
      if (next === 'take') {
        console.log('quiz to load',res.quiz)
        dispatch(loadQuiz(res.quiz));
        return dispatch(actionsMode.changeMode('question', quiz));  
      } else {
        return;
      }    
    })
    .catch(error => {
      dispatch(actionsMode.showModal(error));
    });
};

// @@@@@@@@@@  S U B M I T     C H O I C E S    @@@@@@@@@@@@@@

export const submitChoices = (user, quiz, nextIndex, mode, choices) => dispatch => { 
  // choices has this format { userId, quizId, attempt, questionId, choices (array), index, stickyIndex }
  const preScoreUpdate = {
    nextIndex: nextIndex,
    completed: quiz.completed + 1,
    pending: quiz.pending + 1
  };
  dispatch(nextQuestion(preScoreUpdate));
  
  const url = `${REACT_APP_BASE_URL}/api/choices/`;
  const headers = { 
    "Content-Type": "application/json", 
    "Authorization": "Bearer " + user.authToken,
    "x-requested-with": "xhr"
  };
  const init = { 
    method: 'POST',
    headers,
    body: JSON.stringify(choices),
  };
  console.log('init for submitChoices', init);

  // POST CHOICE: SCORES, SAVES IN DB, RETURNS TRUE OR FALSE
  return fetch(url, init)
  .then(res => {
    console.log('choices fetched (this user, this quiz, this attempt',res);
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })

  // UPDATE COMPLETED & CORRECT THIS QUIZ
  .then(res => { 

    const quizCorrect = res.correct ? quiz.correct + 1 : quiz.correct ;
    const pending = quiz.pending > 0 ? quiz.pending - 1 : 0 ; 
    const postScoreUpdate = {
      id: res.id,
      quizId: res.quizId,
      quizPending: pending,
      quizCorrect: quizCorrect,
      questionCorrect: res.correct,
      questionId: res.questionId,  // used to confirm match in reducer
      choices: res.choices,
      index: choices.index,
      attempt: res.attempt,
      stickyIndex: choices.stickyIndex, // currently not using, might in future
    };
    console.log('postScoreUpdate',postScoreUpdate);
    dispatch(scoreChoice(postScoreUpdate));
  })

  // ADVANCE TO SCORE IF AT END
  .then(()=> {
    if ( mode === 'results' ) { 
      console.log('choices.quizId', choices.quizId, 'attempt', choices.attempt);
      return dispatch(actionsMode.changeMode('results', quiz));
    } 
  })
  .catch(error => {
    dispatch(actionsMode.showModal(error));
  });
}