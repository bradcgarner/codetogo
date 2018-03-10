// quizList is the list of the USER's quizzes
// do not confuse with general.menuOfAllQuizzes, which includes everything

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

// redundant of single quiz update, but this affects the list, so user sees updated score in the list as well
export const UPDATE_QUIZLIST_SCORE = 'UPDATE_QUIZLIST_SCORE';
export const updateQuizListScore = (idQuiz, score) => ({
  type: UPDATE_QUIZLIST_SCORE,
  idQuiz,
  score, 
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@