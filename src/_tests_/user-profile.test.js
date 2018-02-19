import React from 'react';
import { shallow, mount } from 'enzyme';
import { Profile, mapStateToProps } from '../components/user/profile';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Profile component', () => {
  const renderedComponent = shallow(<Profile 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Profile should render', () => {
    renderedComponent
  });
});