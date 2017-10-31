import {NEW_GAME, newGame, MAKE_GUESS, makeGuess, TOGGLE_INFO_MODAL, toggleInfoModal} from '../actions';

describe('newGame', () => {
  it('Should start a new game', () => {
      const action = newGame();
      expect(action.type).toEqual(NEW_GAME);
      expect(action.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(action.correctAnswer).toBeLessThanOrEqual(100);
  });
});

describe('makeGuess', () => {
  it('Should return with new guess', () => {
      const guess = 1;
      const action = makeGuess(guess);
      expect(action.type).toEqual(MAKE_GUESS);
      expect(action.guess).toEqual(guess);
  });
});

describe('toggleInfoModal', () => {
  it('Should toggle info modal', () => {
      const action = toggleInfoModal();
      expect(action.type).toEqual(TOGGLE_INFO_MODAL);
  });
  
});