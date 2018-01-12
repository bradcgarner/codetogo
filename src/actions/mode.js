import * as actionsQuiz from './quiz';
import * as actionsUser from './users'; 

// one action for each property of state.mode
// see initialState.js for the list

export const GOTO = 'GOTO';
export const goto = view => ({
  type: GOTO,
  view: view
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

// @@@@@@@@@@@@@@ 'ASYNC' @@@@@@@@@@@@@@@@

export const changeMode = (view,quiz) => dispatch => {
  dispatch(goto(view));
  if (quiz) {
    console.log('changeMode quiz', quiz);
    if (view !== 'question' && ( quiz.cacheCompleted || quiz.cacheCorrect ) && quiz.id ) {
      console.log('UPDATING USER SCORE',quiz.id,quiz.cacheCompleted,quiz.cacheCorrect);
      dispatch(actionsUser.updateScoreFromCache(
        quiz.id,
        quiz.cacheCompleted,
        quiz.cacheCorrect
      ));
      dispatch(actionsQuiz.clearUserCache());
    }
  }
}
