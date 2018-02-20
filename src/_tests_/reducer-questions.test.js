import * as actions from '../actions/questions';
import { reducer } from '../reducers/questions';
import { initialQuestions as initialState } from '../reducers/initialState';

describe('reducer - questions', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });
  
  it('should load array of questions', () => {
    const action = {
      type: actions.LOAD_QUESTIONS, 
      questions: []
    };
    const expectedResult = action.questions;
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });
  
  // do versions for front, middle, back, different values
  it.skip('should load updated question', () => {
    const action = {
      type: actions.UPDATE_QUESTION, 
      index: 0,
      indexNext: 1,
      score: 4,
    };
    const expectedResult = {...initialState, menuOfAllQuizzes: action.menuOfAllQuizzes};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});