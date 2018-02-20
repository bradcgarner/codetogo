import * as actions from '../actions/badges';

describe('actions - badges', () => {

  it('should create an action to load badges', () => {
    const param = {};
    const expectedResult = {
      type: actions.LOAD_BADGES,
      badges: param
    }
    const result = actions.loadBadges(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to add a badge', () => {
    const param = {};
    const expectedResult = {
      type: actions.ADD_BADGE,
      badge: param
    }
    const result = actions.addbadge(param);
    expect(result).toEqual(expectedResult)
  });

  //postBadge = (badge, authToken)

});