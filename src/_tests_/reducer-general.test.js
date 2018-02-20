import * as actions from '../actions/general';
import { reducer } from '../reducers/general';
import { initialGeneral as initialState } from '../reducers/initialState';

describe('reducer - general', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });
  
  it('should load object with all quizzes', () => {
    const action = {
      type: actions.LOAD_MENU_OF_QUIZZES, 
      menuOfAllQuizzes: {}
    };
    const expectedResult = {...initialState, menuOfAllQuizzes: action.menuOfAllQuizzes};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});