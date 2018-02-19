import React from 'react';
import { shallow, mount } from 'enzyme';
import { Feedback, mapStateToProps } from '../components/quiz/feedback';
import { initialQuestions, initialQuiz, initialUser } from '../reducers/initialState';

describe('Feedback component', () => {
  const renderedComponent = shallow(<Feedback 
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
    handleSubmit={jest.fn()}
  />);

  it('Smoke test - Feedback should render', () => {
    renderedComponent
  });

  it('Should map state to props', () => {
    const state = {
      questions: initialQuestions, 
      quiz: initialQuiz, 
      user: initialUser, 
    };
    const mockState = mapStateToProps(state);
    expect(mockState).toEqual(state);
  });
  
});