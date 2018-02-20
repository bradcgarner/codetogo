import * as actions from '../actions/quiz';
import { reducer } from '../reducers/quiz';
import { initialQuiz as initialState } from '../reducers/initialState';

describe('reducer - quiz', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });
  
  it('should load quiz', () => {
    const action = {
      type: actions.LOAD_QUIZ, 
      quiz: {},
    };    
    const expectedResult = action.quiz;
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should update quiz score', () => {
    const action = {
      type: actions.UPDATE_QUIZ_SCORE, 
      scorePrior: 2,
      scoreNew: 4,
    };   
    const calculatedScore = initialState.score - action.scorePrior + action.scoreNew; 
    const expectedResult = {...initialState, score: calculatedScore};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should update quiz index current', () => {
    const action = {
      type: actions.UPDATE_QUIZ_INDEX_CURRENT, 
      indexCurrent: 0,
    };    
    const expectedResult = {...initialState, indexCurrent: action.indexCurrent};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should update next state', () => {
    const action = {
      type: actions.UPDATE_NEXT_STATE, 
      nextState: {},
    };    
    const expectedResult = {...initialState, nextState: action.nextState};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should toglge show answers', () => {
    const action = {
      type: actions.TOGGLE_SHOW_ANSWERS, 
      showingAnswers: true,
    };    
    const expectedResult = {...initialState, showingAnswers: action.showingAnswers};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});