import * as actions from '../actions/display';
import { initialDisplay } from './initialState';

export const reducer = ( state = initialMode, action ) => { 
  if ( action.type === actions.SHOW_MODAL ) {
    return {...state,
      modal: true,
      message: action.message,
    };
  }
  if ( action.type === actions.CLOSE_MODAL ) {
    return {...state,
      modal: false,
      message: action.message,
    };
  }
  if ( action.type === actions.SHOW_LOADING ) {
    return {...state,
      loading: true,
    };
  }
  if ( action.type === actions.CLOSE_LOADING ) {
    return {...state,
      loading: false,
    };
  }
    
  return state;
}