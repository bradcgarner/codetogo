import * as actions from '../actions/mode';
import { initialMode } from './initialState';

export const reducer = ( state = initialMode, action ) => {
  const goto = action.type.slice(0,5);
  if ( goto === 'GOTO_' ) {
      return Object.assign({}, state, {
        view: action.view,
        burger: false
      })
  } else if ( action.type === actions.SHOW_MODAL ) {
    return Object.assign({}, state, {
      modal: action.modal,
      message: action.message,
      burger: false
    })
  } else if ( action.type === actions.CLOSE_MODAL ) {
    return Object.assign({}, state, {
      modal: action.modal,
      burger: false      
    })
  } else if ( action.type === actions.TOGGLE_BURGER ) {
    return Object.assign({}, state, {
      burger: action.burger,
    })
  } else if ( action.type === actions.TOGGLE_OPTION ) {
    return Object.assign({}, state, {
      option: action.option,
    })
  } else {
    return state;
  }
}