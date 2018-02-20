import * as actions from '../actions/questions';

describe('actions - questions', () => {

  it('should create an action to load questions', () => {
    const param = '';
    const expectedResult = {
      type: actions.LOAD_QUESTIONS,
      questions: param
    }
    const result = actions.loadQuestions(param);
    expect(result).toEqual(expectedResult)
  });


  it('should create an action to update a single question', () => {
    const index = 0;
    const indexNext = 1;
    const score = 4;
    const expectedResult = {
      type: actions.UPDATE_QUESTION,
      index,
      indexNext,
      score,
    }
    const result = actions.updateQuestion(index, indexNext, score);
    expect(result).toEqual(expectedResult)
  });

  // answerQuestion = (answerObject, authToken)

});