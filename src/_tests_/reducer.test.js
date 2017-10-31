import reducer from '../reducer';
import {newGame, makeGuess, toggleInfoModal} from '../actions';
import {NEW_GAME, MAKE_GUESS, TOGGLE_INFO_MODAL } from '../actions';

describe('reducer', () => {
  const guess1 = 1;
  const guess2 = 100;
  const state = {
    guesses: [],
    feedback: 'Make your guess!',
    correctAnswer: 3,
    showInfoModal: false
};
  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.showInfoModal).toBe(false);
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  it('should return a new game', () => {
    let currentState = {};
    const state = reducer(currentState, newGame());
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.showInfoModal).toBe(false);    
  });

  it('should make a hot guess', () => {
    let guess = 5;
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([guess]);
    expect(newState.feedback).toEqual('You\'re Hot!');
  });

  it('should make a valid guess and concat guesses array', () => {
    let guess = 5;
    state.correctAnswer = 10;
    const stateWithGuesses = Object.assign({}, state, {guesses: [2,3]});
    const newState = reducer(stateWithGuesses, makeGuess(guess));
    expect(newState.guesses).toEqual([2,3,guess]);
    expect(newState.feedback).toEqual('You\'re Hot!');
  });

  it('should make a correct guess', () => {
    let guess = 10;
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([guess]);
    expect(newState.feedback).toEqual('You got it!');
  });

  it('should make a warm guess', () => {
    let guess = 25;
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([guess]);
    expect(newState.feedback).toEqual('You\'re Warm');
  });

  it('should make a cold guess', () => {
    let guess = 45;
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([guess]);
    expect(newState.feedback).toEqual('You\'re Cold...');
  });

  it('should make a ice cold guess', () => {
    let guess = 65;
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([guess]);
    expect(newState.feedback).toEqual('You\'re Ice Cold...');
  });

  it('should make an empty guess', () => {
    let guess = '';
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([]);
    expect(newState.feedback).toEqual('Please enter a valid number');
    expect(newState.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(newState.correctAnswer).toBeLessThanOrEqual(100);
  });

  it('should make an invalid guess', () => {
    let guess = 'word';
    state.correctAnswer = 10;
    const newState = reducer(state, makeGuess(guess));
    expect(newState.guesses).toEqual([]);
    expect(newState.feedback).toEqual('Please enter a valid number');
    expect(newState.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(newState.correctAnswer).toBeLessThanOrEqual(100);
  });

  it('should show the info modal', () => {
    let currentState = {};
    currentState.showInfoModal = false;
    const state = reducer(currentState, toggleInfoModal());
    expect(state.showInfoModal).toEqual(true);
  });

  it('should hide the info modal', () => {
    let currentState = {};
    currentState.showInfoModal = true;
    const state = reducer(currentState, toggleInfoModal());
    expect(state.showInfoModal).toEqual(false);
  });

});