import * as actions from '../actions/quizList';

describe('actions - quizList', () => {

  it('should create an action to load quiz list', () => {
    const param = [];
    const expectedResult = {
      type: actions.LOAD_QUIZ_LIST,
      quizList: param
    }
    const result = actions.loadQuizList(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to add quiz', () => {
    const param = {};
    const expectedResult = {
      type: actions.ADD_QUIZ,
      quiz: param
    }
    const result = actions.addQuiz(param);
    expect(result).toEqual(expectedResult)
  });

  it('should create an action to update score in quiz list', () => {
    const idQuiz = 'a1234dfg';
    const scorePrior = 0;
    const scoreNew = 1;
    const expectedResult = {
      type: actions.UPDATE_QUIZLIST_SCORE,
      idQuiz,
      scorePrior, 
      scoreNew, 
    }
    const result = actions.updateQuizListScore(idQuiz, scorePrior, scoreNew);
    expect(result).toEqual(expectedResult)
  });

});