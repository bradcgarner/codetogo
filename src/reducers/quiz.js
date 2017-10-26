import * as actions from '../actions/quiz';
import { initialQuiz } from './initialState';

export const reducer = ( state = initialQuiz, action ) => {
  if ( action.type === actions.questions ) {
    return Object.assign({}, state, {
      questions: action.questions
    })
  } else if ( action.type === actions.UPDATE_QUIZ_MENU ) {
    return Object.assign({}, state, {
      menuOfAllQuizzes: action.menuOfAllQuizzes
    })
  } else if ( action.type === actions.UPDATE_QUIZ_STORE ) {
    console.log(action);
    return Object.assign({}, state, {
      id: action.id,    
      name: action.name,
      category: action.category,
      difficulty: action.difficulty,
      questions: action.questions || state.questions,
      originalLength: action.originalLength || state.questions.length,
      attempt: action.attempt,    
      currentIndex: action.currentIndex || 0,
      completed: action.completed,
      correct: action.correct,  
      total: action.total,  
    }) 
  } else if ( action.type === actions.INCREMENT_QUIZ_STORE ) {
    console.log(action);
    return Object.assign({}, state, {
      currentIndex: action.currentIndex || 0,
      completed: action.completed,
      correct: action.correct,  
    }) 
  } else if ( action.type === actions.UPDATE_CURRENT_QUESTION ) {
      return Object.assign({}, state, {
        currentIndex: action.currentIndex
      })    
      
  // this updates the CURRENT quiz
  } else if (action.type === actions.SCORE_CHOICE) {
    console.log('action', action)
    const questions = [...state.questions]; // create/copy immutable object from state.quizzes
    console.log('questions after array assign from state', questions)
    const questionIndex = questions.findIndex(question => question.id === action.questionId);
    console.log('questionIndex', questionIndex)
    questions[questionIndex].correct = action.correct;
    questions[questionIndex].choices = action.choices;
    console.log('questions after scoring', questions)
    return Object.assign({}, state, { questions });
  } else { 
    return state;
  }
}

