import { REACT_APP_BASE_URL } from '../config';
import * as actionsMode from './mode';
import * as actionsUser from './users';
import 'whatwg-fetch';
// const deepAssign = require('deep-assign');

// NOTE: Quiz is for quizzes and questions. CHOICES GO IN USERS.

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
  questions: quiz.newQuestions,
  oldQuestions: quiz.oldQuestions,
  total: quiz.total,
  originalLength: quiz.originalLength,
  attempt: quiz.attempt,
  currentIndex: 0,
  completed: quiz.completed,
  correct: quiz.correct,
});

// used only when submitting choices
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = quiz => ({
  type: NEXT_QUESTION,
  currentIndex: quiz.nextIndex,
  completed: quiz.completed,
  cacheCompleted: quiz.completed,  
  pending: quiz.pending,
});

// only used for skipping, not when submitting choices
export const UPDATE_CURRENT_QUESTION = 'UPDATE_CURRENT_QUESTION';
export const updateCurrentQuestion = nextIndex => ({
  type: UPDATE_CURRENT_QUESTION,
  currentIndex: nextIndex,
});

// update current quiz with score for 1 question
export const SCORE_CHOICE = 'SCORE_CHOICE';
export const scoreChoice = score => ({
  type: SCORE_CHOICE,
  quizPending: score.quizPending,
  quizCorrect: score.quizCorrect,
  questionCorrect: score.questionCorrect,
  questionId: score.questionId,           // used to confirm a match in reducer
  choices: score.choices,
  index: score.index,
  attempt: score.attempt,                // not currently used, might in future
  stickyIndex: score.stickyIndex,        // not currently used, might in future
});

export const UPDATE_QUIZ_MENU = 'UPDATE_QUIZ_MENU';
export const updateQuizMenu = menu => ({
  type: UPDATE_QUIZ_MENU,
  menuOfAllQuizzes: menu
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

// ~~~~~~~~~~~~ HELPERS TO TAKE OR ADD QUIZ ~~~~~~~~~~~~

export const calcAttemptNum = (quizId, theUser) => {
  let  attempt = 1;
  console.log('quizId',quizId)
  console.log('theUser.quizzes',theUser.quizzes)
  const priorAttempts = theUser.quizzes.filter(quiz=>quiz.id === quizId); 
  console.log('priorAttempts',priorAttempts)
  // user should already be deepAssign();
  const priorAttempt = priorAttempts[priorAttempts.length-1];
  console.log('priorAttempt',priorAttempt)
  if ( priorAttempt ) {
    console.log('priorAttempt is truthy')    
    console.log('priorAttempt.completed',priorAttempt.completed, 'priorAttempt.originalLength',priorAttempt.originalLength)    
    if ( priorAttempt.completed >= priorAttempt.originalLength ) {
      attempt = priorAttempt.attempt + 1;
      console.log('increment', attempt)
    } else {
    attempt = priorAttempt.attempt || 1;    
    console.log('same', attempt)
    
    }
  }  
   return attempt;
}

// @@@@@@@@@@  T A K E     O R     A D D     Q U I Z  @@@@@@@@@@@@@@

// quiz parameter is either one of user.quizzes or menuOfAllQuizzes
// next parameter is 'callback' (what do you want to do next? take quiz? or nothing?)
export const takeOrAddQuiz = (quiz, user, next) => dispatch => {
  const authToken = user.authToken;
  const quizId = quiz.id; 
  const userId = user.id; 
  let attempt = 1;
  // whereas 'next' is used by client, 'add' is used by server; i.e. 'want to add?'
  let prior = user.quizzes.find(quiz=>quiz.id === quizId);
  let add = !prior ? 'add' : 'take' ;
  console.log('next', next, 'add', add);

  // attempts are incremented here and only here (open to show more...)
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
      // res is object { quiz: {}, user: {} } mirroring store (open to see more...)
        // user is included for confirmation, though we are not using new user,
        // instead we are updating user locally, with locally available data, and in the db concurrently. 
        // Next take of quiz prompts partial reload of user for that quiz. 
        // Next login prompts rescoring of user's most recent quizzes (to sync).
        // Next login fully refreshes user from db, of course.

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
    // res has following format {}
      // userId: 5a11c6d67d2c6e9078c1082e,
      // questionId: 59ec0f3514f8ec02e5756737,
      // quizId: 59ec0f3514f8ec02e57566d7,
      // choices: ["59ec0f3514f8ec02e575673b"],
      // correct: true,
      // id: 5a11e391667288977fccb1fa,
      // attempt: 0 }

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