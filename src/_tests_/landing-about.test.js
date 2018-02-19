import React from 'react';
import { shallow, mount } from 'enzyme';
import { About, mapStateToProps } from '../components/landing/about';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('About component', () => {
  const renderedComponent = shallow(<About 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - About should render', () => {
    renderedComponent
  });
});