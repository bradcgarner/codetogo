import React from 'react';
import { shallow, mount } from 'enzyme';
import { Results, mapStateToProps } from '../components/quiz/results';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Results component', () => {
  const renderedComponent = shallow(<Results 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Results should render', () => {
    renderedComponent
  });
});