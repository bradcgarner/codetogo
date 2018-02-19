import React from 'react';
import { shallow, mount } from 'enzyme';
import { User, mapStateToProps } from '../components/user/user';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('User component', () => {
  const renderedComponent = shallow(<User 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - User should render', () => {
    renderedComponent
  });
});