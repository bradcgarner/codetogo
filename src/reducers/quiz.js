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
    console.log('LOAD QUIZ', action);
    return Object.assign({}, state, {
      id: action.id,    
      name: action.name,
      category: action.category,
      difficulty: action.difficulty,
      questions: action.questions,
      oldQuestions: action.oldQuestions,      
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
  // currently passing in stickyIndex and attempt, though not using
  } else if (action.type === actions.SCORE_CHOICE) {
    console.log('SCORE', action)
    const questions = [...state.questions]; // create/copy immutable object from state.quizzes
    let questionIndex = action.index;
    const thisQuestion = questions[questionIndex];
    console.log('index, thisQuestion', questionIndex, thisQuestion);
    if (thisQuestion.id !== action.questionId) {
      questionIndex = questions.findIndex(question => question.id === action.questionId);
      console.log('new questionIndex', questionIndex);
    }
    if (questionIndex >=0 && typeof questionIndex === 'number') { // if no match, do nothing (client will be out-of-sync with server, but won't crash)

      questions[questionIndex].correct = action.questionCorrect;
      questions[questionIndex].choices = action.choices;
      console.log('questions[questionIndex]', questions[questionIndex]);
    
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
    } else {
      console.log('cancelling', questionIndex);
      return state;
    }
    
  } else if ( action.type === actions.CLEAR_USER_CACHE ) {
    return Object.assign({}, state, {
      cacheForUser: action.cacheForUser,
    });

  } else { 
    return state;
  }
}

