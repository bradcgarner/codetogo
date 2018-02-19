import React from 'react';
import { shallow, mount } from 'enzyme';
import { Header, mapStateToProps } from '../components/header/header';
import {initialDisplay, initialQuiz, initialQuestions, initialUser, initialActivity, initialBadges, initialGeneral} from '../reducers/initialState';

describe('Header component', () => {
  const renderedComponent = shallow(<Header 
    quiz={initialQuiz} 
    user={initialUser} 
  />);

  it('Smoke test - Header should render', () => {
    renderedComponent
  });
});