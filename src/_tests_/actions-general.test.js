import * as actions from '../actions/general';

describe('actions - general', () => {

  it('should create an action to load menu of all quizzes', () => {
    const param = '';
    const expectedResult = {
      type: actions.LOAD_MENU_OF_QUIZZES,
      menuOfAllQuizzes: param
    }
    const result = actions.loadMenuOfAllQuizzes(param);
    expect(result).toEqual(expectedResult)
  });

  //intiialize

});