import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login, mapStateToProps } from '../components/user/login';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Login component', () => {
  const renderedComponent = shallow(<Login 
    activity={initialActivity} 
    badges={initialBadges} 
    display={initialDisplay} 
    general={initialGeneral}
    questions={initialQuestions} 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Login should render', () => {
    renderedComponent
  });
});