import React from 'react';
import { shallow, mount } from 'enzyme';
import { SpacedRepGraphic, mapStateToProps } from '../components/quiz/spaced-rep-graphic';
import { initialQuestions, initialQuiz } from '../reducers/initialState';

describe('SpacedRepGraphic component', () => {
  const renderedComponent = shallow(<SpacedRepGraphic 
    questions={initialQuestions} 
    quiz={initialQuiz} 
    scoringObject= {{
      indexCurrent: 0,
      indexNextPrior: 1,
      scorePrior: 2,
      scoreIfTrue: 4,
      scoreIfFalse: 0,
      positionsIfTrue: 4,
      positionsIfFalse: 2,
      indexInsertAfterIfTrue: 3,
      indexInsertAfterIfTrueLabel: 'string',
      indexInsertAfterIfFalse: 5,
      indexInsertAfterIfFalseLabel: 'string2',
      indexInsertBeforeIfTrue: 4,
      indexInsertBeforeIfFalse: 2
    }}
  />);

  it('Smoke test - SpacedRepGraphic should render', () => {
    renderedComponent
  });

  it('Should map state to props', () => {
    const state = {
      questions: initialQuestions, 
      quiz: initialQuiz, 
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});