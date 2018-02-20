import * as actions from '../actions/user';

describe('actions - user', () => {

  it('should create an action to load user to state', () => {
    const param = {};
    const expectedResult = {
      type: actions.LOAD_USER,
      user: param
    }
    const result = actions.loadUser(param);
    expect(result).toEqual(expectedResult)
  });

  it('should convert an array to object with keys', () => {
    const array = [
      {id: 'a1', name: 'a1name'},
      {id: 'b1', name: 'b1name'}
    ];
    const key = 'id';
    const expectedResult = {
      a1: {id: 'a1', name: 'a1name'},
      b1: {id: 'b1', name: 'b1name'}
    }
    const result = actions.convertArrayToObject(array, key);
    expect(result).toEqual(expectedResult)
  });

  //login (credentials)

  // createUser(newUser)

  // updateUser = (userToUpdate, authToken)

});