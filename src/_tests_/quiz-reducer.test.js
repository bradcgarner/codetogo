import reducer from '../reducers';
import * as actionsMode from '../actions/mode';
import * as actionsUser from '../actions/users';
import * as actionsQuiz from '../actions/quiz';
import * as initialState from '../reducers/initialState';

describe('reducer', () => {
  const initialQuiz = initialState.initialQuiz;

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.quiz).toEqual(initialState.initialQuiz);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialQuiz, {type: '__UNKNOWN'});
    expect(state.quiz).toBe(initialQuiz);
  });

  it('Should toggle form status to true', () => {
    const action = {type: 'TOGGLE_FORM_STATUS', formIsEmpty: true};
    const state = reducer(initialQuiz, action);
    expect(state.quiz.id).toBe(initialQuiz.id);
    expect(state.quiz.formIsEmpty).toBe(true);
  });

  it('Should toggle form status to true', () => {
    const action = {type: 'TOGGLE_FORM_STATUS', formIsEmpty: false};
    const state = reducer(initialQuiz, action);
    expect(state.quiz.id).toBe(initialQuiz.id);
    expect(state.quiz.formIsEmpty).toBe(false);
  });

  it('Should update quiz menu', () => {
    const action = {type: 'UPDATE_QUIZ_MENU', menuOfAllQuizzes: ['uno','dos','tres']};
    const state = reducer(initialQuiz, action);
    expect(state.quiz.id).toBe(initialQuiz.id);
    expect(state.quiz.formIsEmpty).toBe(true);
    expect(state.quiz.menuOfAllQuizzes).toEqual(['uno','dos','tres']);
  });

  it('should load quiz', () => {
    let sampleQuiz = { 
      id: '1234',
      name: 'sampleQ',
      attempt: 7,
      category: 'HTML',
      difficulty: 3,
      total: 22,
      originalLength: 77,
      currentIndex: 4, 
      questions: [{     
        question: 'how many',
        id: '567',
        inputType: 'checkbox',
        answers: [{
          option: 'this many',
          id: '987',
        }],
        correct: 6,
        choices: ['3456','6789'],
      }],
      formIsEmpty: true,
      menuOfAllQuizzes: ['2345','4680'] ,
      type: 'LOAD_QUIZ'
    };
    const state = reducer(initialQuiz, sampleQuiz);
    expect(state.quiz.id).toEqual('1234');   
  });

  it('Should go to next question', () => {
    const action = {
      type: 'NEXT_QUESTION', 
      currentIndex: 9,
      completed: 8,
      correct: 6,  
    };
    const state = reducer(initialQuiz, action);
    expect(state.quiz.id).toBe(initialQuiz.id);
    expect(state.quiz.formIsEmpty).toBe(true);
    expect(state.quiz.currentIndex).toEqual(9);
    expect(state.quiz.completed).toEqual(8);
    expect(state.quiz.correct).toEqual(6);
  });

  it('Should update current question', () => {
    const action = {
      type: 'UPDATE_CURRENT_QUESTION', 
      currentIndex: 19,
    };
    const state = reducer(initialQuiz, action);
    expect(state.quiz.id).toBe(initialQuiz.id);
    expect(state.quiz.formIsEmpty).toBe(true);
    expect(state.quiz.currentIndex).toEqual(19);
    expect(state.quiz.completed).toEqual(initialQuiz.completed);
    expect(state.quiz.correct).toEqual(initialQuiz.correct);
  });

  it('Should update current quiz score', () => {
    const action = {
      type: 'SCORE_CHOICE', 
      currentIndex: 19,
      questionId: 0,
      correct: 5,
      choices: ['x', 'y']
    };
    const state = reducer(initialQuiz, action);
    expect(state.quiz.id).toBe(initialQuiz.id);
    expect(state.quiz.formIsEmpty).toBe(true);
    expect(state.quiz.questions[0].correct).toEqual(5);
    expect(state.quiz.questions[0].choices).toEqual(['x', 'y']);
  });

});