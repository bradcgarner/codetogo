import React from 'react';
import { shallow, mount } from 'enzyme';
import { Reason, mapStateToProps } from '../components/quiz/reason';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Reason component', () => {
  const renderedComponent = shallow(<Reason 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Reason should render', () => {
    renderedComponent
  });
});