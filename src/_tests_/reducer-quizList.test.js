import * as actions from '../actions/quizList';
import { reducer } from '../reducers/quizList';
import { initialQuizList as initialState } from '../reducers/initialState';

describe('reducer - quizList', () => {

  it('Should return the initial state when nothing is passed in', () => {
    const result = reducer(undefined, {type: '__UNKNOWN'});
    expect(result).toEqual(initialState);
  });
  
  it('should load array of all user\'s quizzes', () => {
    const action = {
      type: actions.LOAD_QUIZ_LIST, 
      quizList: {}
    };
    const expectedResult = action.quizList;
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

  it('should add an quiz to the user', () => {
    const action = {
      type: actions.ADD_QUIZ, 
      quiz: {}
    };    
    const expectedResult = {...initialState, [action.quiz.id]: action.quiz};
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult)
  });

});