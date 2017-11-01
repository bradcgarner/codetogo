import reducer from '../reducers';
import * as actionsMode from '../actions/mode';
import * as actionsUser from '../actions/users';
import * as actionsQuiz from '../actions/quiz';
import * as initialState from '../reducers/initialState';

describe('reducer', () => {
  const initialUser = initialState.initialUser;

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.user).toEqual(initialState.initialUser);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialUser, {type: '__UNKNOWN'});
    expect(state.user).toBe(initialUser);
  });

  it('should update the user in the store', () => {
    let sampleUser = { 
      id: '555',
      firstName: 'testFirst',
      lastName: 'testLast',
      username: 'testusername',
      quizzes: [{ 
        id: '123',
        name: 'testQuiz',
        attempt: 0,
        total: 3,
        completed: 1,
        correct: 2,
        category: 'CSS',
        difficulty: 5
      }],
      badges: 'noBadges',
      recent: 'noRecent',
      authToken: '456',
      type: 'UPDATE_USER_STORE'
    };
    const state = reducer(initialUser, sampleUser);
    expect(state.user.firstName).toEqual('testFirst');   
  });

  it('should add a quiz to the user in the store', () => {
    let sampleUser = { 
      id: '5555',
      firstName: 'testFirst2',
      lastName: 'testLast2',
      username: 'testusername2',
      badges: 'noBadges',
      recent: 'noRecent',
      authToken: '456'
    };
    let updatedUser = { 
      id: '5555',
      firstName: 'testFirst2',
      lastName: 'testLast2',
      username: 'testusername2',
      quizzes: [{ 
        id: '1234',
        name: 'testQuiz2',
        attempt: 0,
        total: 3,
        completed: 1,
        correct: 2,
        category: 'CSS',
        difficulty: 5
      }],
      badges: 'noBadges',
      recent: 'noRecent',
      authToken: '456',
      type: 'UPDATE_USER_STORE'
    };
    const state = reducer(sampleUser, updatedUser);
    console.log(state);
    expect(state.user.firstName).toEqual(sampleUser.firstName);   
    expect(state.user.quizzes).toEqual(updatedUser.quizzes);   
  });



});