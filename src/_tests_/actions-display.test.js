import * as actions from '../actions/display';

describe('actions - display', () => {

  it('should create an action to show modal', () => {
    const param = '';
    const expectedResult = {
      type: actions.SHOW_MODAL,
      message: param,
      loading: false,
    }
    const result = actions.showModal(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to close modal', () => {
    const expectedResult = {
      type: actions.CLOSE_MODAL,
    }
    const result = actions.closeModal();
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to show loading', () => {
    const expectedResult = {
      type: actions.SHOW_LOADING,
    }
    const result = actions.showLoading();
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to close loading', () => {
    const expectedResult = {
      type: actions.CLOSE_LOADING,
    }
    const result = actions.closeLoading();
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to toggle menu', () => {
    const expectedResult = {
      type: actions.TOGGLE_MENU,
    }
    const result = actions.toggleMenu();
    expect(result).toEqual(expectedResult)
  });
  
  it('should create an action to toggle settings', () => {
    const expectedResult = {
      type: actions.TOGGLE_SETTINGS,
    }
    const result = actions.toggleSettings();
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to toggle about', () => {
    const expectedResult = {
      type: actions.TOGGLE_ABOUT,
    }
    const result = actions.toggleAbout();
    expect(result).toEqual(expectedResult)
  });

});