// one action for each property of state.mode
// see initialState.js for the list

export const GOTO_LANDING = 'GOTO_LANDING';
export const gotoLanding = () => ({
  type: GOTO_LANDING,
  view: 'landing'
})

export const GOTO_ABOUT = 'GOTO_ABOUT';
export const gotoAbout = () => ({
  type: GOTO_ABOUT,
  view: 'about'
})

export const GOTO_LOGIN = 'GOTO_LOGIN';
export const gotoLogin = () => ({
  type: GOTO_LOGIN,
  view: 'login'
})

export const GOTO_PROFILE = 'GOTO_PROFILE';
export const gotoProfile = () => ({
  type: GOTO_PROFILE,
  view: 'profile'
})

export const GOTO_DASHBOARD = 'GOTO_DASHBOARD';
export const gotoDashboard = () => ({
  type: GOTO_DASHBOARD,
  view: 'dashboard'
})

export const GOTO_QUIZLIST = 'GOTO_QUIZLIST';
export const gotoQuizlist = () => ({
  type: GOTO_QUIZLIST,
  view: 'quizlist'
})

export const GOTO_QUESTION = 'GOTO_QUESTION';
export const gotoQuestion = () => ({
  type: GOTO_QUESTION,
  view: 'question'
})

export const GOTO_RESULTS = 'GOTO_RESULTS';
export const gotoResults = () => ({
  type: GOTO_RESULTS,
  view: 'results'
})

export const GOTO_ACCURACY = 'GOTO_ACCURACY';
export const gotoAccuracy = () => ({
  type: GOTO_ACCURACY,
  view: 'accuracy'
})

export const GOTO_KEY = 'GOTO_KEY';
export const gotoKey = () => ({
  type: GOTO_KEY,
  view: 'key'
})

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (message) => ({
  type: SHOW_MODAL,
  modal: 'open',
  message
})

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({
  type: CLOSE_MODAL,
  modal: 'close'
})

export const TOGGLE_BURGER = 'TOGGLE_BURGER';
export const toggleBurger = (current) => ({
  type: TOGGLE_BURGER,
  burger: !current
})

export const TOGGLE_OPTION = 'TOGGLE_OPTION';
export const toggleOption = (option) => ({
  type: TOGGLE_OPTION,
  option: option
})
