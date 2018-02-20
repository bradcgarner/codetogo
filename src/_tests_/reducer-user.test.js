import * as actions from '../actions/user';
import { reducer } from '../reducers/user';
import { initialUser as initialState } from '../reducers/initialState';

describe('reducer - user', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });

  it('should add an quiz to the user', () => {
    const action = {
      type: actions.LOAD_USER, 
      user: {}
    };    
    const expectedResult = action.user;
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});