import * as actions from '../actions/display';
import { reducer } from '../reducers/display';
import { initialDisplay as initialState } from '../reducers/initialState';

describe('reducer - display', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });
  
  it('should load show modal', () => {
    const action = {
      type: actions.SHOW_MODAL, 
      modal: true,
      message: 'message',
      loading: false, 
    };
    const expectedResult = {...initialState, 
      modal: action.modal,
      message: action.message, 
      loading: action.loading,
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should close modal', () => {
    const action = {
      type: actions.CLOSE_MODAL, 
      modal: false,
      message: '',
    };    
    const expectedResult = {...initialState, 
      message: action.message
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should load show loading', () => {
    const action = {
      type: actions.SHOW_LOADING, 
    };
    const expectedResult = {...initialState, 
      loading: true
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should close loading', () => {
    const action = {
      type: actions.CLOSE_LOADING, 
    };    
    const expectedResult = {...initialState, 
      loading: false
    };    
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should toggle menu', () => {
    const action = {
      type: actions.TOGGLE_MENU, 
    };    
    const expectedResult = {...initialState, 
      menu: !initialState.menu
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should load toggle settings', () => {
    const action = {
      type: actions.TOGGLE_SETTINGS, 
    };
    const expectedResult = {...initialState, 
      settings: !initialState.settings
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should toggle about', () => {
    const action = {
      type: actions.TOGGLE_ABOUT, 
    };    
    const expectedResult = {...initialState, 
      about: !initialState.about
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});