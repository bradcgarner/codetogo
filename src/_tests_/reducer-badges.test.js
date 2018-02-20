import * as actions from '../actions/badges';
import { reducer } from '../reducers/badges';
import { initialBadges as initialState } from '../reducers/initialState';

describe('reducer - badges', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });
  
  it('should load array of all badges', () => {
    const action = {
      type: actions.LOAD_BADGES, 
      badges: []
    };
    const expectedResult = action.badges;
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should add a badge', () => {
    const action = {
      type: actions.ADD_BADGE, 
      badge: {}
    };    
    const expectedResult = [...initialState, action.badge];
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});