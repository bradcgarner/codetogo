export const initialActivity = [
  {
    id: 0,
    idUser: 0,
    actions: 'quiz',
    name: 'JS Basic',
    category: 'cat',
    topic: 'topic',
  }
];

export const initialBadges = [
  {
    id: 0,
    idUser: 0,
    name: 'bad',
    category: 'cat',
    topic: 'topic',
    score: 88,
    label: 'expert',
  }
];

export const initialDisplay = {  // store.mode
  menu: false,
  settings: false,
  about: false,
  loading: false,
  modal: false,    // userSettings, quizSettings
  modalMessage: '',
  spacedRepGraphic: true,
  resultsModal: false,
};

export const initialGeneral = {
  menuOfAllQuizzes: [], // menu of all quizzes in the database, loads at 1st visit to <QuizList />. Array does not store questions.
};

export const initialQuestions = [ // all questions this quiz, parsed out individually using "current" as the index
  {
    id: 0,
    idUser: 0,
    idQuiz: 0,
    version: 1,
    question: '',
    typeQuestion: 'fact',
    answers: [{
      option: '',
      id: 0,
    }],
    typeAnswer: 'checkbox', // radio || text
    source: 'google',
    reason: 'because',
    topic: 'topic',
    difficulty: 5,
    score: 2,
    index: 1,
    indexNext: 7,
  }
];

export const initialQuiz = { // store.quiz - single current quiz, loads when user clicks <QuizLi/ > from <QuizList /> or <Dashboard />
  id: 0,
  idUser: 0,
  name: 'test',
  version: 'version',
  notes: 'notes',
  category: 'cat',
  topic: 'topic',
  difficulty: 3,
  total: 3,
  score: 0,
  indexCurrent: 0,
  showingAnswers: false,
  nextState: {},
  choicesPrior: [],
};

export const initialQuizList = {
  abc123: { // all quizzes user has ever taken
    id: 0,
    idUser: 0,
    name: 'test',
    version: 'version',
    notes: 'notes',
    category: 'cat',
    topic: 'topic',
    difficulty: 3,
    total: 3,
    score: 0,
    indexCurrent: 0,
  }
};

export const initialScoringObject = {
  idQuestion: null,
  idUser: null,
  idQuiz: null,
  indexCurrent: null,
  scorePrior: null,
  indexNextPrior: null,
  scoreIfTrue: null,
  positionsIfTrue:  null,
  indexInsertAfterIfTrue: null,
  indexInsertBeforeIfTrue: null,
  indexInsertAfterIfTrueLabel: null,
  scoreIfFalse: null,
  positionsIfFalse: null,
  indexInsertAfterIfFalse: null,
  indexInsertBeforeIfFalse: null,
  indexInsertAfterIfFalseLabel: null,
  indexRedirect: null,
  indexRedirectNext:null,
};

export const initialUser = { // store.user, single current user, loads at login
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  authToken: ''
};