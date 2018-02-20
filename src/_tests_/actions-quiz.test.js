import * as actions from '../actions/quiz';

describe('actions - quiz', () => {

  it('should create an action to load quiz', () => {
    const param = {};
    const expectedResult = {
      type: actions.LOAD_QUIZ,
      quiz: param
    }
    const result = actions.loadQuiz(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to update quiz score', () => {
    const scorePrior = 1;
    const scoreNew = 2;
    const expectedResult = {
      type: actions.UPDATE_QUIZ_SCORE,
      scorePrior,
      scoreNew,
    }
    const result = actions.updateQuizScore(scorePrior, scoreNew);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to update quiz current index', () => {
    const param = 1;
    const expectedResult = {
      type: actions.UPDATE_QUIZ_INDEX_CURRENT,
      indexCurrent: param
    }
    const result = actions.updateQuizIndexCurrent(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to show answers', () => {
    const param = true;
    const expectedResult = {
      type: actions.TOGGLE_SHOW_ANSWERS,
      showingAnswers: param
    }
    const result = actions.toggleShowAnswers(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to update next state', () => {
    const param = {};
    const expectedResult = {
      type: actions.UPDATE_NEXT_STATE,
      nextState: param
    }
    const result = actions.updateNextState(param);
    expect(result).toEqual(expectedResult)
  });

  // getQuiz = idQuiz

  // takeQuiz (idQuiz, idUser, option, authToken)

});