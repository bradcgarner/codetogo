import * as actions from '../actions/activity';
import { reducer } from '../reducers/activity';
import { initialActivity as initialState } from '../reducers/initialState';

describe('reducer - activity', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });

  it('should load array of all activity', () => {
    const action = {
      type: actions.LOAD_ACTIVITY, 
      activity: {}
    };
    const expectedResult = action.activity;
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should add an activity', () => {
    const action = {
      type: actions.ADD_ACTIVITY, 
      activity: {}
    };    
    const expectedResult = [...initialState, action.activity];
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});