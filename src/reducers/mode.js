import * as actions from '../actions/mode';
import { initialMode } from './initialState';

export const reducer = ( state = initialMode, action ) => {
  if ( action.type === 'GOTO' ) {
      return Object.assign({}, state, {
        view: action.view,
        burger: false,
        option: null
      })
  } else if ( action.type === actions.SHOW_MODAL ) {
    return Object.assign({}, state, {
      modal: action.modal,
      message: action.message,
      burger: false,
      option: null
    })
  } else if ( action.type === actions.CLOSE_MODAL ) {
    return Object.assign({}, state, {
      modal: action.modal,
      burger: false,
      option: null    
    })
  } else if ( action.type === actions.TOGGLE_BURGER ) {
    return Object.assign({}, state, {
      burger: action.burger,
      option: null
    })
  } else if ( action.type === actions.TOGGLE_OPTION ) {
    return Object.assign({}, state, {
      option: action.option,
    })
  } else {
    return state;
  }
}