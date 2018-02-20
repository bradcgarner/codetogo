import * as actions from '../actions/activity';

describe('actions - activity', () => {

  it('should create an action to load all activities', () => {
    const param = {};
    const expectedResult = {
      type: actions.LOAD_ACTIVITY,
      activity: param
    }
    const result = actions.loadActivity(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to add an activity', () => {
    const param = {};
    const expectedResult = {
      type: actions.ADD_ACTIVITY,
      activity: param
    }
    const result = actions.addActivity(param);
    expect(result).toEqual(expectedResult)
  });

  // postActivity = (activity, authToken)

});