import * as actions from '../actions/mode';
import { initialMode } from './initialState';

export const reducer = ( state = initialMode, action ) => {
  const goto = action.type.slice(0,5);
  if ( goto === 'GOTO_' ) {
      return Object.assign({}, state, {
        view: action.view,
      })
  } else if ( action.type === actions.SHOW_MODAL ) {
    return Object.assign({}, state, {
      modal: action.modal,
      message: action.message
    })
  } else if ( action.type === actions.CLOSE_MODAL ) {
    return Object.assign({}, state, {
      modal: action.modal,
    })
  } else {
    return state;
  }
}