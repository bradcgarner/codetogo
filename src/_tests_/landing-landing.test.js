import React from 'react';
import { shallow, mount } from 'enzyme';
import { Landing, mapStateToProps } from '../components/landing/landing';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Landing component', () => {
  const renderedComponent = shallow(<Landing 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Landing should render', () => {
    renderedComponent
  });
});