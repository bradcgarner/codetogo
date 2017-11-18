export const initialUser = { // store.user, single current user, loads at login
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  quizzes: [{ // all quizzes user has ever taken
    id: 0,
    name: 'test',
    attempt: 0,
    total: 3,
    completed: 1,
    correct: 1,
    category: '',
    difficulty: 3
  }],
  badges: 'none',
  recent: 'nothing',
  authToken: ''
};

export const initialQuiz = { // store.quiz - single current quiz, loads when user clicks <QuizLi/ > from <QuizList /> or <Dashboard />
  id: 0,
  name: '',
  attempt: 0,
  category: '',
  difficulty: '',
  total: '',
  originalLength: 0,
  currentIndex: 0,       // index of array below, advances via submit choice or skip button
  completed: 1,
  correct: 1,
  questions: [{     // all questions this quiz, parsed out individually using "current" as the index
    question: '',
    id: 0,
    inputType: 'checkbox',
    answers: [{
      option: '',
      id: 0,
    }],
    // user data for current quiz
    correct: '',
    choices: [],
  }],
  formIsEmpty: true,
  menuOfAllQuizzes: [] // menu of all quizzes in the database, loads at 1st visit to <QuizList />. Array does not store questions.
};

export const initialMode = {  // store.mode
  view: 'landing', // landing, about, login, profile, dashboard, quizlist, 
                   // question, result, accuracy, key
  modal: '', // userSettings, quizSettings
  burger: false, // true if burgerMenu is also burgerShow
  option: 'none' // key, accuracy
} 