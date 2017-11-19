import * as actions from '../actions/quiz';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {
  // if ( action.type === actions.questions ) {
  //   return Object.assign({}, state, {
  //     questions: action.questions
  //   })
  // } else 
  if ( action.type === actions.TOGGLE_FORM_STATUS ) {
    return Object.assign({}, state, {
      formIsEmpty: action.formIsEmpty
    })

  } else if ( action.type === actions.UPDATE_QUIZ_MENU ) {
    return Object.assign({}, state, {
      menuOfAllQuizzes: action.menuOfAllQuizzes
    })

  } else if ( action.type === actions.LOAD_QUIZ ) {
    return Object.assign({}, state, {
      id: action.id,    
      name: action.name,
      category: action.category,
      difficulty: action.difficulty,
      questions: action.questions,
      originalLength: action.originalLength,
      attempt: action.attempt,    
      currentIndex: action.currentIndex || 0,
      completed: action.completed,
      correct: action.correct,  
      cacheForUser: {            // cache accumulates during quiz; when mode changes, clear this and move to user 
        completed: null,
        correct: null,
      }, 
      total: action.questions.length,  
      pending: 0,
      formIsEmpty: true
    }) 

  } else if ( action.type === actions.NEXT_QUESTION ) {
    return Object.assign({}, state, {
      currentIndex: action.currentIndex,
      completed: action.completed,
      correct: action.correct,
      pending: action.pending,
      formIsEmpty: true      
    })

  } else if ( action.type === actions.UPDATE_CURRENT_QUESTION ) {
      return Object.assign({}, state, {
        currentIndex: action.currentIndex,
        formIsEmpty: true        
      })    
      
  // update CURRENT quiz
  } else if (action.type === actions.SCORE_CHOICE) {
    const questions = [...state.questions]; // create/copy immutable object from state.quizzes
    let questionIndex = action.index;
    const thisQuestion = questions[questionIndex];
    if (thisQuestion.id !== action.questionId) {
      questionIndex = questions.findIndex(question => question.id === action.questionId);
    }
    questions[questionIndex].correct = action.questionCorrect;
    questions[questionIndex].choices = action.choices;

    return Object.assign({},
      state, 
      { questions },
      { formIsEmpty: true,
        pending: action.quizPending,
        correct: action.quizCorrect,
        cacheForUser: {            // cache accumulates during quiz; when mode changes, clear this and move to user 
          completed: action.quizCompleted,
          correct: action.quizCorrect,
        }, 
      }
    );

  } else if ( action.type === actions.CLEAR_USER_CACHE ) {
    return Object.assign({}, state, {
      cacheForUser: action.cacheForUser,
    });

  } else { 
    return state;
  }
}

