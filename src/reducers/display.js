import * as actions from '../actions/display';
import { initialDisplay } from './initialState';

export const reducer = ( state = initialDisplay, action ) => { 
  if ( action.type === actions.SHOW_MODAL ) {
    return {...state,
      modal: true,
      message: action.message,
      loading: false,  
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

  if ( action.type === actions.TOGGLE_MENU ) {
    return {...state,
      menu: !state.menu,
    };
  }

  if ( action.type === actions.TOGGLE_SETTINGS ) {
    return {...state,
      settings: !state.settings,
    };
  }

  if ( action.type === actions.TOGGLE_ABOUT ) {
    return {...state,
      about: !state.about,
    };
  }
    
  return state;
}